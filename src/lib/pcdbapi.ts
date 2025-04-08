import crypto from "crypto";

const API_SECRET = process.env.PCDB_API_SECRET!;
const API_URL = process.env.PCDB_API_URL!;

export interface OidcClient {
  _id?: string;
  name: string;
  email: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  id_token_signed_response_alg: string;
  userinfo_signed_response_alg: string;
  active: boolean;
  client_secret?: string;
  key?: string;

  // Not sure we need to expose the following fields:
  site?: string[];
  title?: string;
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

  private async request<T>(
    method: string,
    path: string,
    requestData?: Partial<OidcClient>
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

    const response = await fetch(`${API_URL}${path}`, {
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
    return this.request("GET", `/api/oidc_clients?email=${email}`);
  }

  async getOidcClient(id: string, email: string): Promise<OidcClient> {
    return this.request("GET", `/api/oidc_clients/${id}?email=${email}`);
  }

  async createOidcClient(email: string, data: Partial<OidcClient>): Promise<OidcClient> {
    return this.request("POST", `/api/oidc_clients?email=${email}`, data);
  }

  async updateOidcClient(
    id: string,
    email: string,
    data: Partial<OidcClient>
  ): Promise<OidcClient> {
    return this.request("PATCH", `/api/oidc_clients/${id}?email=${email}`, data);
  }
}

export const pcdbClient = new PCDBClient();
