// Checks the mock provider against the exact calls next-auth makes:
// core/lib/oauth/callback.js does client.callback(url, params, {state, nonce})
// then, because the provider sets idToken:false, client.userinfo(tokens).
// Run: node --test e2e/mock-proconnect.test.ts

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { Issuer } from "openid-client";

const PORT = 4321;
const ISSUER = `http://localhost:${PORT}`;
const REDIRECT_URI = "http://localhost:3000/api/auth/callback/proconnect";

let server: ReturnType<typeof spawn>;

before(async () => {
  server = spawn(
    process.execPath,
    [fileURLToPath(new URL("./mock-proconnect.ts", import.meta.url))],
    { env: { ...process.env, MOCK_PROCONNECT_PORT: String(PORT) }, stdio: "ignore" },
  );
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      await fetch(`${ISSUER}/.well-known/openid-configuration`);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("mock provider did not start");
});

after(() => server.kill());

test("authorization code flow yields the email and sub that were typed", async () => {
  const issuer = await Issuer.discover(ISSUER);
  const client = new issuer.Client({
    client_id: "mock-proconnect-client-id",
    client_secret: "mock-proconnect-client-secret",
    redirect_uris: [REDIRECT_URI],
    response_types: ["code"],
    id_token_signed_response_alg: "RS256",
  });

  const state = "state-value";
  const nonce = "nonce-value";
  const authorization_url = client.authorizationUrl({
    scope: "openid email",
    state,
    nonce,
  });

  // Browser leg: the two screens, followed by the redirect back to the app.
  const step_one = await fetch(authorization_url);
  const auth_id = /name="auth_id" value="([^"]+)"/.exec(await step_one.text())?.[1];
  assert.ok(auth_id, "step 1 carries an auth_id");

  const step_two_url = new URL(`${ISSUER}/authorize/identity`);
  step_two_url.searchParams.set("auth_id", auth_id);
  step_two_url.searchParams.set("email", "ursula@test.proconnect.gouv.fr");
  await fetch(step_two_url);

  const callback_url = new URL(`${ISSUER}/authorize/callback`);
  callback_url.searchParams.set("auth_id", auth_id);
  callback_url.searchParams.set("email", "ursula@test.proconnect.gouv.fr");
  callback_url.searchParams.set("sub", "2");
  const redirected = await fetch(callback_url, { redirect: "manual" });
  const location = redirected.headers.get("location");
  assert.ok(location?.startsWith(REDIRECT_URI), "redirects back to the app");

  // Server leg: what next-auth runs once the browser is back.
  const tokens = await client.callback(REDIRECT_URI, client.callbackParams(location), {
    state,
    nonce,
  });
  const profile = await client.userinfo(tokens);

  assert.equal(profile.sub, "2");
  assert.equal(profile.email, "ursula@test.proconnect.gouv.fr");
});

test("end_session_endpoint sends the browser back to the app", async () => {
  const post_logout = "http://localhost:3000/api/proconnect/logout-callback";
  const response = await fetch(
    `${ISSUER}/session/end?post_logout_redirect_uri=${encodeURIComponent(post_logout)}`,
    { redirect: "manual" },
  );
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), post_logout);
});
