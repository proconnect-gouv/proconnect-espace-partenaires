import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../lib/log";
import { pcdbClient } from "../../../lib/pcdbapi";
import { getSessionUser } from "../../../lib/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    if (req.method === "PATCH") {
      const app = await pcdbClient.updateOidcClient(id, user, req.body);
      return res.status(200).json(app);
    }

    if (req.method === "GET") {
      const app = await pcdbClient.getOidcClient(id, user);
      return res.status(200).json(app);
    }

    if (req.method === "DELETE") {
      const result = await pcdbClient.deleteOidcClient(id, user);
      return res.status(200).json(result);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    logger.error("API error:", error);
    return res.status(500).json({ message: "Error processing request" });
  }
}
