import { NextApiRequest, NextApiResponse } from "next";
import { prisma_espace } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { state } = req.query;
  const { pc_logout_state, "next-auth.session-token": sessionToken } = req.cookies;

  if (!state || !pc_logout_state || state !== pc_logout_state) {
    return res.status(400).json({ error: "State invalide" });
  }

  if (sessionToken) {
    await prisma_espace.session.deleteMany({
      where: { sessionToken },
    });
  }

  res.setHeader("Set-Cookie", [
    `next-auth.session-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    `pc_id_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    `pc_logout_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  ]);

  return res.redirect("/login");
}
