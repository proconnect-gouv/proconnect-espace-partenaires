import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export type SessionUser = { email: string; id: string };

export async function getSessionUser(
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"],
): Promise<SessionUser | null> {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return null;
  return { email: session.user.email, id: session.user.id };
}
