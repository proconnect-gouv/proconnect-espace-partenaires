import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma_proconnect } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    // First check if the app belongs to the user
    const app = await prisma_proconnect.oidcClient.findFirst({
      where: {
        id,
        email: session.user.email,
      },
    });

    if (!app) {
      return res.status(404).json({ message: 'App not found' });
    }

    // Update the app
    const updatedApp = await prisma_proconnect.oidcClient.update({
      where: { id },
      data: {
        ...req.body,
        updatedAt: new Date(),
        updatedBy: session.user.email,
      },
    });

    return res.status(200).json(updatedApp);
  } catch (error) {
    console.error('Failed to update app:', error);
    return res.status(500).json({ message: 'Error updating app' });
  }
} 