"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArticleGrid({ articles }) {
  if (!articles.length) {
    return <p className="text-center text-muted-foreground">No articles found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article._id} className="hover:shadow-md transition">
          <CardContent className="p-4 space-y-4">
            <CardTitle className="text-lg">{article.title}</CardTitle>
            <CardDescription>{article.meta}</CardDescription>
            <Link href={`/article/${article.slug}`}>
              <Button variant="outline" className="w-full">
                Read More
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}