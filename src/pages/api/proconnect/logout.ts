import { prisma_espace } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import * as oidcClient from "openid-client";
import { getProConnectConfig } from "../../../lib/proconnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idTokenHint = req.cookies.pc_id_token;

  if (!idTokenHint) {
    const cookieName =
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";
    const sessionToken = req.cookies[cookieName] || req.cookies["next-auth.session-token"];
    if (sessionToken) {
      await prisma_espace.session.deleteMany({ where: { sessionToken } });
    }
    res.setHeader("Set-Cookie", [
      `next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
      `__Secure-next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`,
    ]);
    return res.redirect("/");
  }

  const state = randomBytes(32).toString("hex");

  res.setHeader("Set-Cookie", [`pc_logout_state=${state}; Path=/; HttpOnly; SameSite=Lax`]);

  const config = await getProConnectConfig();

  const logoutUrl = oidcClient.buildEndSessionUrl(config, {
    id_token_hint: idTokenHint,
    post_logout_redirect_uri: `${process.env.NEXTAUTH_URL}/api/proconnect/logout-callback`,
    state,
  });

  return res.redirect(logoutUrl.toString());
}
