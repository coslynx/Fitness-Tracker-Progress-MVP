import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { Goal } from '@/lib/types/goal';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Goal[] | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    return res.status(500).json({ message: 'Error fetching goals' });
  }
}