import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import CommentSection from '@/components/CommentSection';
import { marked } from 'marked';

export async function generateMetadata({ params }) {
  await connectDB();
  const article = await Article.findOne({ slug: params.slug });
  return {
    title: article.title,
    description: article.meta,
    openGraph: {
      title: article.title,
      description: article.meta,
      url: `https://yourdomain.com/article/${article.slug}`,
      type: 'article'
    }
  };
}

export default async function ArticleDetail({ params }) {
  await connectDB();
  const article = await Article.findOne({ slug: params.slug });

  // Convert markdown content to HTML
  const htmlContent = marked(article.content || '');

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-muted-foreground">{article.meta}</p>
      <div 
        className="prose prose-invert mt-6" 
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
      <CommentSection articleId={article.slug} />
    </div>
  );
}
