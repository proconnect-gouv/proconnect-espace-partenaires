import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import * as oidcClient from "openid-client";
import { prisma_espace } from "../../../lib/prisma";
import { getProConnectConfig } from "../../../lib/proconnect";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.redirect("/");
  }

  // Récupérer l'id_token depuis la table Account
  const account = await prisma_espace.account.findFirst({
    where: {
      userId: (session.user as { id: string }).id,
      provider: "proconnect",
    },
  });

  if (!account?.id_token) {
    // Pas de compte ProConnect, déconnexion simple via NextAuth
    return res.redirect(`/api/auth/signout?callbackUrl=/`);
  }

  const state = randomBytes(32).toString("hex");

  res.setHeader("Set-Cookie", [`pc_logout_state=${state}; Path=/; HttpOnly; SameSite=Lax`]);

  const config = await getProConnectConfig();

  const logoutUrl = oidcClient.buildEndSessionUrl(config, {
    id_token_hint: account.id_token,
    post_logout_redirect_uri: `${process.env.NEXTAUTH_URL}/api/proconnect/logout-callback`,
    state,
  });

  return res.redirect(logoutUrl.toString());
}
