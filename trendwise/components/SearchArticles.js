'use client';
import { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SearchArticles({ articles }) {
  const [query, setQuery] = useState('');
  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full p-3 mb-6 border rounded-lg bg-background text-foreground"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((article) => (
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
      {filtered.length === 0 && query && (
        <p className="text-center text-muted-foreground mt-8">
          No articles found matching "{query}"
        </p>
      )}
    </div>
  );
}