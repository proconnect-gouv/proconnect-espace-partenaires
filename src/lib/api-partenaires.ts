import crypto from "crypto";
import { track } from "./log";
import { prisma_espace } from "./prisma";
import { SessionUser } from "./session";

const API_SECRET = process.env.PCDB_API_SECRET!;
const API_URL = process.env.PCDB_API_URL!;

export interface OidcClient {
  _id?: string;
  name: string;
  email: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  collaborators: string[];
  id_token_signed_response_alg: string;
  userinfo_signed_response_alg: string | null;
  active: boolean;
  client_secret?: string;
  key?: string;

  // Not sure we need to expose the following fields:
  site?: string[];
  entityId?: string;
  scopes?: string[];
  claims?: string[];
  IPServerAddressesAndRanges?: string[];
  credentialsFlow?: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  type?: string;
  jwks_uri?: string;
}

export class ApiPartenairesClient {
  private generateSignature(timestamp: string, method: string, path: string, body?: string) {
    const message = body
      ? `${timestamp}:${method}:${path}:${body}`
      : `${timestamp}:${method}:${path}`;
    return crypto.createHmac("sha256", API_SECRET).update(message).digest("hex");
  }

  private async findProconnectAccessToken(email: string): Promise<string | null> {
    const account = await prisma_espace.account.findFirst({
      where: { provider: "proconnect", user: { email } },
      select: { access_token: true, expires_at: true },
    });
    const now = Math.floor(Date.now() / 1000);
    if (!account?.access_token || !account.expires_at || account.expires_at <= now) return null;
    return account.access_token;
  }

  private async request<T>(
    method: string,
    path: string,
    user: SessionUser,
    requestData?: Partial<OidcClient>,
  ): Promise<T> {
    const body = requestData ? JSON.stringify(requestData) : undefined;
    const accessToken = await this.findProconnectAccessToken(user.email);

    let url: URL;
    let headers: Record<string, string>;
    if (accessToken) {
      url = new URL(`${API_URL}${path}`);
      headers = { Authorization: `Bearer ${accessToken}` };
    } else {
      const signedPath = `${path}?email=${user.email}`;
      const timestamp = Math.floor(Date.now() / 1000).toString();
      url = new URL(`${API_URL}${signedPath}`);
      headers = {
        "X-Signature": this.generateSignature(timestamp, method, signedPath, body),
        "X-Timestamp": timestamp,
      };
    }

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const request_fields = {
      auth_method: accessToken ? "bearer" : "signature",
      "http.request.method": method,
      "server.address": url.hostname,
      "server.port": Number(url.port) || (url.protocol === "https:" ? 443 : 80),
      "url.path": url.pathname,
      user_id: user.id,
    };
    track("api_partenaires.request.started", request_fields);
    const start = performance.now();
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    const duration_ms = Math.round(performance.now() - start);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      track("api_partenaires.request.failed", {
        ...request_fields,
        detail: error.detail,
        duration_ms,
        "http.response.status_code": response.status,
      });
      throw new Error(error.detail || "API request failed");
    }

    track("api_partenaires.request.completed", {
      ...request_fields,
      duration_ms,
      "http.response.status_code": response.status,
    });
    return response.json();
  }

  async listOidcClients(user: SessionUser): Promise<OidcClient[]> {
    return this.request("GET", "/api/oidc_clients", user);
  }

  async getOidcClient(id: string, user: SessionUser): Promise<OidcClient> {
    return this.request("GET", `/api/oidc_clients/${id}`, user);
  }

  async createOidcClient(user: SessionUser, data: Partial<OidcClient>): Promise<OidcClient> {
    return this.request("POST", "/api/oidc_clients", user, data);
  }

  async updateOidcClient(
    id: string,
    user: SessionUser,
    data: Partial<OidcClient>,
  ): Promise<OidcClient> {
    return this.request("PATCH", `/api/oidc_clients/${id}`, user, data);
  }

  async deleteOidcClient(id: string, user: SessionUser): Promise<{ deleted: boolean }> {
    return this.request("DELETE", `/api/oidc_clients/${id}`, user);
  }
}

export const apiPartenairesClient = new ApiPartenairesClient();
