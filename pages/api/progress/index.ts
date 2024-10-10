import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { ProgressEntry } from '@/lib/types/progress';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgressEntry[] | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const progressEntries = await prisma.progressEntry.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return res.status(200).json(progressEntries);
    } else if (req.method === 'POST') {
      const { goalId, value, date } = req.body;

      if (!goalId || !value || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newProgressEntry = await prisma.progressEntry.create({
        data: {
          goalId: parseInt(goalId, 10),
          value,
          date,
          userId: session.user.id,
        },
      });

      return res.status(201).json(newProgressEntry);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching or creating progress entries:', error);
    return res.status(500).json({ message: 'Error fetching or creating progress entries' });
  }
}