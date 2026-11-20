import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { prisma_espace } from "../../../lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma_espace),
  providers: [
    {
      id: "proconnect",
      name: "ProConnect",
      type: "oauth",
      wellKnown: process.env.PROCONNECT_DISCOVERY_URL,
      authorization: {
        params: { scope: "openid email" },
      },
      checks: ["state", "nonce"],
      idToken: false,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
      client: { id_token_signed_response_alg: "RS256" },
      token: {
        async request({ client, params, checks, provider }) {
          const response = await client.callback(provider.callbackUrl, params, checks);
          return {
            tokens: response,
          };
        },
      },
      clientId: process.env.PROCONNECT_CLIENT_ID,
      clientSecret: process.env.PROCONNECT_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    },
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "database" as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const account = await prisma_espace.account.findFirst({
          where: { userId: user.id, provider: "proconnect" },
          select: { id_token: true },
        });
        session.proConnectIdToken = account?.id_token ?? null;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
