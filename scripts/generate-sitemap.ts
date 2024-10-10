import { promises as fs } from 'fs';
import { join } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const goals = await prisma.goal.findMany();

    const sitemap = new SitemapStream({ hostname: 'http://localhost:3000' });

    goals.forEach((goal) => {
      sitemap.write({
        url: `/goals/${goal.id}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: goal.updatedAt.toISOString(),
      });
    });

    sitemap.write({ url: '/', changefreq: 'daily', priority: 1 });
    sitemap.write({ url: '/dashboard', changefreq: 'daily', priority: 0.8 });
    sitemap.write({ url: '/progress', changefreq: 'daily', priority: 0.8 });

    sitemap.end();

    const sitemapXml = await streamToPromise(sitemap);

    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemapXml);

    res.status(200).end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
}