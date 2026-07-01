import * as client from "openid-client";

let proConnectConfig: client.Configuration | null = null;

export async function getProConnectConfig(): Promise<client.Configuration> {
  if (proConnectConfig) return proConnectConfig;

  const discoveryUrl = process.env.PROCONNECT_DISCOVERY_URL;

  if (!discoveryUrl) {
    throw new Error("PROCONNECT_DISCOVERY_URL is not defined");
  }

  proConnectConfig = await client.discovery(
    new URL(discoveryUrl),
    process.env.PROCONNECT_CLIENT_ID!,
    {
      id_token_signed_response_alg: "RS256",
    },
    client.ClientSecretPost(process.env.PROCONNECT_CLIENT_SECRET!),
  );

  return proConnectConfig;
}
