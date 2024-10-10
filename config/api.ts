import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { Goal } from '@/lib/types/goal';
import { ProgressEntry } from '@/lib/types/progress';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Goal[]
    | Goal
    | ProgressEntry[]
    | ProgressEntry
    | { message: string }
  >
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      // Handle GET requests based on the API endpoint
      if (req.query.id) {
        // Fetch a specific goal by ID
        const goal = await prisma.goal.findUnique({
          where: {
            id: parseInt(req.query.id as string, 10),
            userId: session.user.id,
          },
        });

        if (!goal) {
          return res.status(404).json({ message: 'Goal not found' });
        }

        return res.status(200).json(goal);
      } else {
        // Fetch all goals for the user
        const goals = await prisma.goal.findMany({
          where: {
            userId: session.user.id,
          },
        });

        return res.status(200).json(goals);
      }
    } else if (req.method === 'POST') {
      // Handle POST requests based on the API endpoint
      if (req.query.id) {
        // Create a new progress entry for the goal
        const { goalId, value, date } = req.body;
        if (!goalId || !value || !date) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProgressEntry = await prisma.progressEntry.create({
          data: {
            goalId: parseInt(goalId as string, 10),
            value,
            date: new Date(date),
            userId: session.user.id,
          },
        });

        return res.status(201).json(newProgressEntry);
      } else {
        // Create a new goal
        const { name, targetDate } = req.body;
        if (!name || !targetDate) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const newGoal = await prisma.goal.create({
          data: {
            name,
            targetDate: new Date(targetDate),
            progress: 0,
            target: 10, // Set a default target for the MVP
            userId: session.user.id,
          },
        });

        return res.status(201).json(newGoal);
      }
    } else if (req.method === 'PUT') {
      // Handle PUT requests based on the API endpoint
      if (req.query.id) {
        // Update a specific goal
        const { name, targetDate } = req.body;
        if (!name || !targetDate) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedGoal = await prisma.goal.update({
          where: {
            id: parseInt(req.query.id as string, 10),
            userId: session.user.id,
          },
          data: {
            name,
            targetDate: new Date(targetDate),
          },
        });

        return res.status(200).json(updatedGoal);
      } else {
        // Update a specific progress entry
        const { value, date } = req.body;
        if (!value || !date) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedProgressEntry = await prisma.progressEntry.update({
          where: {
            id: parseInt(req.query.id as string, 10),
            userId: session.user.id,
          },
          data: {
            value,
            date: new Date(date),
          },
        });

        return res.status(200).json(updatedProgressEntry);
      }
    } else if (req.method === 'DELETE') {
      // Handle DELETE requests based on the API endpoint
      if (req.query.id) {
        // Delete a specific goal
        await prisma.goal.delete({
          where: {
            id: parseInt(req.query.id as string, 10),
            userId: session.user.id,
          },
        });

        return res.status(204).end();
      } else {
        // Delete a specific progress entry
        await prisma.progressEntry.delete({
          where: {
            id: parseInt(req.query.id as string, 10),
            userId: session.user.id,
          },
        });

        return res.status(204).end();
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling API request:', error);
    return res.status(500).json({ message: 'Error processing request' });
  }
}