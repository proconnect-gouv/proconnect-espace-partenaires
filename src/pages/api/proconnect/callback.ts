import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import * as oidcClient from "openid-client";
import { prisma_espace } from "../../../lib/prisma";
import { getProConnectConfig } from "../../../lib/proconnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { pc_state, pc_nonce } = req.cookies;

    if (!pc_state || !pc_nonce) {
      return res.status(400).json({ error: "State ou nonce manquant" });
    }

    const config = await getProConnectConfig();

    const currentUrl = new URL(
      `${process.env.PROCONNECT_REDIRECT_URI}?${new URLSearchParams(req.query as Record<string, string>)}`,
    );

    const tokens = await oidcClient.authorizationCodeGrant(config, currentUrl, {
      expectedNonce: pc_nonce,
      expectedState: pc_state,
    });

    const userinfo = await oidcClient.fetchUserInfo(
      config,
      tokens.access_token,
      tokens.claims()!.sub,
    );

    const user = await prisma_espace.user.upsert({
      where: { email: userinfo.email },
      update: { name: `${userinfo.given_name} ${userinfo.usual_name}`.trim() },
      create: {
        email: userinfo.email!,
        name: `${userinfo.given_name} ${userinfo.usual_name}`.trim(),
      },
    });

    const sessionToken = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours

    await prisma_espace.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    const cookieName =
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

    res.setHeader("Set-Cookie", [
      `${cookieName}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}; Secure`,
      `pc_id_token=${tokens.id_token}; Path=/; HttpOnly; SameSite=Lax${secure}`,
      `pc_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
      `pc_nonce=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    ]);

    return res.redirect("/apps");
  } catch (error) {
    console.error("ProConnect callback error:", error);
    return res.redirect(`/login?error=${encodeURIComponent(String(error))}`);
  }
}
