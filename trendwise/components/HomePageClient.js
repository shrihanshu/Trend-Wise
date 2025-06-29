'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageClient() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // Load all articles for search functionality
  useEffect(() => {
    fetch('/api/articles?limit=1000') // Get all articles for search
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setAllArticles(data.articles || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching all articles:', err);
        setLoading(false);
      });
  }, []);

  // Handle pagination and search
  useEffect(() => {
    if (query.trim()) {
      // Client-side search
      setIsSearching(true);
      setCurrentPage(1);
    } else {
      // Server-side pagination
      setIsSearching(false);
      fetch(`/api/articles?page=${currentPage}&limit=${itemsPerPage}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setArticles(data.articles || data);
          setTotalArticles(data.total || data.length);
        })
        .catch(err => {
          console.error('Error fetching articles:', err);
        });
    }
  }, [currentPage, query]);

  // Client-side search filtering
  const filteredArticles = isSearching 
    ? allArticles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : articles;

  // Get paginated articles for search results
  const paginatedArticles = isSearching 
    ? filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : articles;

  // Calculate total pages
  const totalPages = isSearching 
    ? Math.ceil(filteredArticles.length / itemsPerPage)
    : Math.ceil(totalArticles / itemsPerPage);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">📰 TrendWise - AI Generated Blog</h1>
        <div className="text-center">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">📰 TrendWise - AI Generated Blog</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full p-3 mb-6 border rounded-lg bg-background text-foreground"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedArticles.map((article) => (
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

      {/* No Results Message */}
      {filteredArticles.length === 0 && query && (
        <p className="text-center text-muted-foreground mt-8">
          No articles found matching "{query}"
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded transition-colors ${
                currentPage === i + 1 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 