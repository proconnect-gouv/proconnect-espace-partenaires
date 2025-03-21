import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { pcdbClient } from "../../../lib/pcdbapi";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    if (req.method === "PATCH") {
      const app = await pcdbClient.updateOidcClient(
        id,
        session.user.email,
        req.body
      );
      return res.status(200).json(app);
    }

    if (req.method === "GET") {
      const app = await pcdbClient.getOidcClient(id, session.user.email);
      return res.status(200).json(app);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Error processing request" });
  }
}
