import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import { generateArticle } from '@/lib/openai';

export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'POST') {
    const { title, slug, meta, prompt } = req.body;
    const content = await generateArticle(prompt);
    const article = await Article.create({ title, slug, meta, content });
    res.status(200).json(article);
  }
}
