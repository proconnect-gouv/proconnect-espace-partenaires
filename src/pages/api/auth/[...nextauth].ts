import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "../../../lib/auth";
import { prisma_espace } from "../../../lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma_espace),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "1025", 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      sendVerificationRequest,
      from: process.env.EMAIL_FROM,
    }),
    {
      id: "proconnect",
      name: "ProConnect",
      type: "oauth",
      wellKnown: `https://${process.env.PROCONNECT_DOMAIN}/.well-known/openid-configuration`,
      clientId: process.env.PROCONNECT_CLIENT_ID,
      clientSecret: process.env.PROCONNECT_CLIENT_SECRET,
      authorization: {
        params: { scope: "openid email given_name usual_name" },
      },
      idToken: true,
      checks: ["state", "nonce"],
      userinfo: {
        url: `https://${process.env.PROCONNECT_DOMAIN}/userinfo`,
        async request({ tokens }) {
          const response = await fetch(`https://${process.env.PROCONNECT_DOMAIN}/userinfo`, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
          const jwt = await response.text();
          const payload = jwt.split(".")[1];
          return JSON.parse(Buffer.from(payload, "base64url").toString());
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.usual_name}`.trim(),
          email: profile.email,
        };
      },
    },
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "database" as const,
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log("signIn event", JSON.stringify(message, null, 2));
    },
    async session(message) {
      console.log("session event", JSON.stringify(message, null, 2));
    },
  },
};

export default NextAuth(authOptions);
