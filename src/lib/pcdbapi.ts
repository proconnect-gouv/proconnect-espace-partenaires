import crypto from "crypto";
import { prisma_espace } from "./prisma";

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

export class PCDBClient {
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
    email: string,
    requestData?: Partial<OidcClient>,
  ): Promise<T> {
    const body = requestData ? JSON.stringify(requestData) : undefined;
    const accessToken = await this.findProconnectAccessToken(email);

    let url: string;
    let headers: Record<string, string>;
    if (accessToken) {
      url = `${API_URL}${path}`;
      headers = { Authorization: `Bearer ${accessToken}` };
    } else {
      const signedPath = `${path}?email=${email}`;
      const timestamp = Math.floor(Date.now() / 1000).toString();
      url = `${API_URL}${signedPath}`;
      headers = {
        "X-Signature": this.generateSignature(timestamp, method, signedPath, body),
        "X-Timestamp": timestamp,
      };
    }

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "API request failed");
    }

    return response.json();
  }

  async listOidcClients(email: string): Promise<OidcClient[]> {
    return this.request("GET", "/api/oidc_clients", email);
  }

  async getOidcClient(id: string, email: string): Promise<OidcClient> {
    return this.request("GET", `/api/oidc_clients/${id}`, email);
  }

  async createOidcClient(email: string, data: Partial<OidcClient>): Promise<OidcClient> {
    return this.request("POST", "/api/oidc_clients", email, data);
  }

  async updateOidcClient(
    id: string,
    email: string,
    data: Partial<OidcClient>,
  ): Promise<OidcClient> {
    return this.request("PATCH", `/api/oidc_clients/${id}`, email, data);
  }

  async deleteOidcClient(id: string, email: string): Promise<{ deleted: boolean }> {
    return this.request("DELETE", `/api/oidc_clients/${id}`, email);
  }
}

export const pcdbClient = new PCDBClient();
