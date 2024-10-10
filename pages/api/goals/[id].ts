import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { Goal } from '@/lib/types/goal';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Goal | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid goal ID' });
  }

  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: parseInt(id, 10),
        userId: session.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(goal);
    } else if (req.method === 'PUT') {
      const updatedGoal = req.body;

      if (!updatedGoal.name || !updatedGoal.targetDate) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updatedGoalData = await prisma.goal.update({
        where: {
          id: parseInt(id, 10),
          userId: session.user.id,
        },
        data: {
          name: updatedGoal.name,
          targetDate: updatedGoal.targetDate,
        },
      });

      return res.status(200).json(updatedGoalData);
    } else if (req.method === 'DELETE') {
      await prisma.goal.delete({
        where: {
          id: parseInt(id, 10),
          userId: session.user.id,
        },
      });

      return res.status(204).end();
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching goal:', error);
    return res.status(500).json({ message: 'Error fetching goal' });
  }
}