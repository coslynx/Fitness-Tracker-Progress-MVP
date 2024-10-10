import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string }>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
}