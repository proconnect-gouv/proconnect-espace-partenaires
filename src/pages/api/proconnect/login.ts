import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import * as oidcClient from "openid-client";
import { getProConnectConfig } from "../../../lib/proconnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = randomBytes(32).toString("hex");
  const nonce = randomBytes(32).toString("hex");

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookieOptions = `Path=/; HttpOnly; SameSite=Lax${secure}`;
  res.setHeader("Set-Cookie", [
    `pc_state=${state}; ${cookieOptions}`,
    `pc_nonce=${nonce}; ${cookieOptions}`,
  ]);

  const config = await getProConnectConfig();

  const authorizationUrl = oidcClient.buildAuthorizationUrl(config, {
    nonce,
    state,
    redirect_uri: process.env.PROCONNECT_REDIRECT_URI!,
    scope: "openid email given_name usual_name",
    response_type: "code",
  });

  return res.redirect(authorizationUrl.toString());
}
