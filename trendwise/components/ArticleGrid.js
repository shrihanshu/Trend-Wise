import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ArticleGrid({ articles = [] }) {
  // Handle cases where articles is undefined, null, or not an array
  if (!articles || !Array.isArray(articles)) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No articles available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article._id} className="hover:shadow-md transition">
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
            <CardDescription className="mb-4">{article.meta}</CardDescription>
            <Link href={`/article/${article.slug}`}>
              <Button variant="outline" className="w-full">Read More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 