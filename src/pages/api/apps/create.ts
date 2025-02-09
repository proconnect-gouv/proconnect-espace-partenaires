import { ObjectId } from "bson";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma_proconnect } from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const newApp = await prisma_proconnect.oidcClient.create({
      data: {
        id: new ObjectId().toString(),
        name: "Nouvelle application",
        title: "Nouvelle application",
        email: session.user.email,
        site: ["https://site.com"], // TODO?
        // Generate random strings for required fields
        key: crypto.randomBytes(16).toString("hex"),
        client_secret: crypto.randomBytes(32).toString("hex"),
        entityId: crypto.randomBytes(16).toString("hex"),
        // Default arrays
        redirect_uris: [],
        post_logout_redirect_uris: [],

        credentialsFlow: false,
        claims: ["amr"],
        IPServerAddressesAndRanges: ["1.1.1.1"],
        active: true,
        type: "public",
        updatedAt: new Date(),
        updatedBy: "espace-partenaires", // TODO

        scopes: [
          "openid",
          "given_name",
          "usual_name",
          "email",
          "uid",
          "siren",
          "siret",
          "organizational_unit",
          "belonging_population",
          "phone",
          "chorusdt",
          "idp_id",
          "idp_acr",
          "custom",
        ],

        id_token_signed_response_alg: "RS256",
        userinfo_signed_response_alg: "RS256",

        jwks_uri: "",
      },
    });

    return res.status(201).json(newApp);
  } catch (error) {
    console.error("Failed to create app:", error);
    return res.status(500).json({ message: "Error creating app" });
  }
}
