import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { pcdbClient } from "../../../lib/pcdbapi";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    if (req.method === "GET") {
      const apps = await pcdbClient.listOidcClients(session.user.email);
      return res.status(200).json(apps);
    }

    if (req.method === "POST") {
      const app = await pcdbClient.createOidcClient(session.user.email, {
        name: "Nouvelle application",
        redirect_uris: [],
        post_logout_redirect_uris: [],
        active: true,
        id_token_signed_response_alg: "RS256",
        userinfo_signed_response_alg: "RS256",
      });

      return res.status(200).json(app);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Error processing request" });
  }
}
