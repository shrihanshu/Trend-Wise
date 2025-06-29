import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET() {
  await connectDB();
  const articles = await Article.find({});
  const urls = articles.map((a) => `<url><loc>https://trendwise.vercel.app/article/${a.slug}</loc></url>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
