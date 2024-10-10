import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(user);
    } else if (req.method === 'PUT') {
      const updatedUser = req.body;

      if (!updatedUser.email || !updatedUser.password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updatedUserData = await prisma.user.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          email: updatedUser.email,
          password: updatedUser.password,
        },
      });

      return res.status(200).json(updatedUserData);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching or updating user:', error);
    return res.status(500).json({ message: 'Error fetching or updating user' });
  }
}