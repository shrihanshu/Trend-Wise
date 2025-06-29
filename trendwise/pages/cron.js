import { getGoogleTrends } from '@/lib/fetchTrends';
import { generateArticle } from '@/lib/openai';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';

export default async function handler(req, res) {
  await connectDB();
  const trends = await getGoogleTrends();

  for (const t of trends) {
    const slug = t.title.toLowerCase().replace(/\s+/g, '-');
    const exists = await Article.findOne({ slug });
    if (!exists) {
      const content = await generateArticle(`Write an SEO-optimized article on: ${t.title}`);
      await Article.create({ title: t.title, slug, meta: t.title, content });
    }
  }
  res.status(200).json({ message: 'Articles generated' });
}