import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { ProgressEntry } from '@/lib/types/progress';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgressEntry | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid progress entry ID' });
  }

  try {
    const progressEntry = await prisma.progressEntry.findUnique({
      where: {
        id: parseInt(id, 10),
        userId: session.user.id,
      },
    });

    if (!progressEntry) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(progressEntry);
    } else if (req.method === 'PUT') {
      const updatedProgressEntry = req.body;

      if (!updatedProgressEntry.value || !updatedProgressEntry.date) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updatedProgressEntryData = await prisma.progressEntry.update({
        where: {
          id: parseInt(id, 10),
          userId: session.user.id,
        },
        data: {
          value: updatedProgressEntry.value,
          date: updatedProgressEntry.date,
        },
      });

      return res.status(200).json(updatedProgressEntryData);
    } else if (req.method === 'DELETE') {
      await prisma.progressEntry.delete({
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
    console.error('Error fetching or updating progress entry:', error);
    return res.status(500).json({ message: 'Error fetching or updating progress entry' });
  }
}