// Mock ProConnect OIDC provider for e2e — replaces fca.integ01.dev-agentconnect.fr.
// Keeps GitHub secrets out of CI (Dependabot runs never get them) and the e2e
// suite offline. Its pages mimic the real test instance closely enough for the
// steps in uuv/features/login.feature: pick an email, then pick a "sub".
// Run: node e2e/mock-proconnect.ts (Node >= 24 strips the types itself).

import { createServer, type IncomingMessage } from "node:http";

const PORT = Number(process.env.MOCK_PROCONNECT_PORT ?? 4000);
const ISSUER = `http://localhost:${PORT}`;

type Pending = {
  client_id: string;
  nonce: string;
  redirect_uri: string;
  state: string;
};
type Grant = { client_id: string; email: string; nonce: string; sub: string };

const pending = new Map<string, Pending>();
const grants = new Map<string, Grant>();

let key_pair: CryptoKeyPair | undefined;
const kid = "mock-proconnect-key";
async function get_key_pair() {
  key_pair ??= await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  return key_pair;
}

const base64url = (input: ArrayBuffer | string) =>
  Buffer.from(input as ArrayBuffer).toString("base64url");

async function sign_jwt(payload: Record<string, unknown>) {
  const { privateKey } = await get_key_pair();
  const input = [
    base64url(JSON.stringify({ alg: "RS256", kid, typ: "JWT" })),
    base64url(JSON.stringify(payload)),
  ].join(".");
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(input),
  );
  return `${input}.${base64url(signature)}`;
}

type Reply = { body: string; headers?: Record<string, string>; status?: number };

const json = (data: unknown, status = 200): Reply => ({
  body: JSON.stringify(data),
  headers: { "content-type": "application/json" },
  status,
});
const html = (body: string): Reply => ({
  body: `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Instance de test ProConnect</title></head><body><main>${body}</main></body></html>`,
  headers: { "content-type": "text/html; charset=utf-8" },
});
const redirect = (location: string): Reply => ({
  body: "",
  headers: { location },
  status: 302,
});
const hidden = (params: Record<string, string>) =>
  Object.entries(params)
    .map(([name, value]) => `<input type="hidden" name="${name}" value="${value}">`)
    .join("");

async function handle(request: IncomingMessage, body: string): Promise<Reply> {
  const url = new URL(request.url ?? "/", ISSUER);

  switch (url.pathname) {
    case "/.well-known/openid-configuration":
      return json({
        issuer: ISSUER,
        authorization_endpoint: `${ISSUER}/authorize`,
        token_endpoint: `${ISSUER}/token`,
        userinfo_endpoint: `${ISSUER}/userinfo`,
        end_session_endpoint: `${ISSUER}/session/end`,
        jwks_uri: `${ISSUER}/jwks`,
        response_types_supported: ["code"],
        grant_types_supported: ["authorization_code"],
        subject_types_supported: ["public"],
        scopes_supported: ["openid", "email"],
        claims_supported: ["sub", "email"],
        id_token_signing_alg_values_supported: ["RS256"],
        token_endpoint_auth_methods_supported: ["client_secret_post", "client_secret_basic"],
      });

    case "/jwks": {
      const { publicKey } = await get_key_pair();
      const jwk = await crypto.subtle.exportKey("jwk", publicKey);
      return json({ keys: [{ ...jwk, alg: "RS256", kid, use: "sig" }] });
    }

    // Step 1 — email screen, as on the real test instance.
    case "/authorize": {
      const auth_id = crypto.randomUUID();
      pending.set(auth_id, {
        client_id: url.searchParams.get("client_id") ?? "",
        nonce: url.searchParams.get("nonce") ?? "",
        redirect_uri: url.searchParams.get("redirect_uri") ?? "",
        state: url.searchParams.get("state") ?? "",
      });
      return html(`
        <h2>Vous êtes sur une instance de test</h2>
        <form method="get" action="/authorize/identity">
          ${hidden({ auth_id })}
          <label for="email">Email professionnel</label>
          <input id="email" name="email" type="email" autofocus>
          <button type="submit">Continuer</button>
        </form>`);
    }

    // Step 2 — the test instance lets you choose which "sub" you log in as.
    case "/authorize/identity":
      return html(`
        <h2>Se connecter</h2>
        <form method="get" action="/authorize/callback">
          ${hidden({
            auth_id: url.searchParams.get("auth_id") ?? "",
            email: url.searchParams.get("email") ?? "",
          })}
          <label for="sub">sub</label>
          <input id="sub" name="sub" type="text">
          <button type="submit">Se connecter</button>
        </form>`);

    case "/authorize/callback": {
      const auth_id = url.searchParams.get("auth_id") ?? "";
      const auth = pending.get(auth_id);
      if (!auth) return { body: "unknown auth_id", status: 400 };
      pending.delete(auth_id);

      const code = crypto.randomUUID();
      grants.set(code, {
        client_id: auth.client_id,
        email: url.searchParams.get("email") ?? "",
        nonce: auth.nonce,
        sub: url.searchParams.get("sub") ?? "",
      });

      const target = new URL(auth.redirect_uri);
      target.searchParams.set("code", code);
      target.searchParams.set("state", auth.state);
      target.searchParams.set("iss", ISSUER);
      return redirect(target.toString());
    }

    case "/token": {
      const params = new URLSearchParams(body);
      const code = params.get("code") ?? "";
      const grant = grants.get(code);
      if (!grant) return json({ error: "invalid_grant" }, 400);
      grants.delete(code);

      const now = Math.floor(Date.now() / 1000);
      const access_token = crypto.randomUUID();
      grants.set(access_token, grant); // read back by /userinfo

      return json({
        access_token,
        token_type: "Bearer",
        expires_in: 3600,
        id_token: await sign_jwt({
          aud: grant.client_id,
          auth_time: now,
          exp: now + 3600,
          iat: now,
          iss: ISSUER,
          nonce: grant.nonce,
          sub: grant.sub,
        }),
      });
    }

    case "/userinfo": {
      const access_token = (request.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
      const grant = grants.get(access_token);
      if (!grant) return json({ error: "invalid_token" }, 401);
      return json({ sub: grant.sub, email: grant.email, email_verified: true });
    }

    case "/session/end":
      return redirect(url.searchParams.get("post_logout_redirect_uri") ?? "/");

    default:
      return { body: "not found", status: 404 };
  }
}

createServer((request, response) => {
  const chunks: Buffer[] = [];
  request.on("data", (chunk) => chunks.push(chunk));
  request.on("end", async () => {
    const { body, headers, status } = await handle(request, Buffer.concat(chunks).toString());
    response.writeHead(status ?? 200, headers);
    response.end(body);
  });
}).listen(PORT, () => console.log(`mock ProConnect listening on ${ISSUER}`));
