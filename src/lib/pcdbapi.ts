import crypto from "crypto";
import { track } from "./log";

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

export type SessionUser = { email: string; id: string };

export class PCDBClient {
  private generateSignature(timestamp: string, method: string, path: string, body?: string) {
    const message = body
      ? `${timestamp}:${method}:${path}:${body}`
      : `${timestamp}:${method}:${path}`;
    return crypto.createHmac("sha256", API_SECRET).update(message).digest("hex");
  }

  private async request<T>(
    method: string,
    path: string,
    user: SessionUser,
    requestData?: Partial<OidcClient>,
  ): Promise<T> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body = requestData ? JSON.stringify(requestData) : undefined;
    const signature = this.generateSignature(timestamp, method, path, body);

    const headers: Record<string, string> = {
      "X-Signature": signature,
      "X-Timestamp": timestamp,
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const url = new URL(`${API_URL}${path}`);
    const request_fields = {
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
    return this.request("GET", `/api/oidc_clients?email=${user.email}`, user);
  }

  async getOidcClient(id: string, user: SessionUser): Promise<OidcClient> {
    return this.request("GET", `/api/oidc_clients/${id}?email=${user.email}`, user);
  }

  async createOidcClient(user: SessionUser, data: Partial<OidcClient>): Promise<OidcClient> {
    return this.request("POST", `/api/oidc_clients?email=${user.email}`, user, data);
  }

  async updateOidcClient(
    id: string,
    user: SessionUser,
    data: Partial<OidcClient>,
  ): Promise<OidcClient> {
    return this.request("PATCH", `/api/oidc_clients/${id}?email=${user.email}`, user, data);
  }

  async deleteOidcClient(id: string, user: SessionUser): Promise<{ deleted: boolean }> {
    return this.request("DELETE", `/api/oidc_clients/${id}?email=${user.email}`, user);
  }
}

export const pcdbClient = new PCDBClient();
