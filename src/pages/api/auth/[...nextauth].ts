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
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    verifyRequest: "/login",
  },
  session: {
    strategy: "database" as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
