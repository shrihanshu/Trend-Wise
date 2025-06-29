'use client';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import ArticleGrid from '@/components/ArticleGrid';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  const { data: session } = useSession();

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`/api/articles?page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setArticles(data.articles || []);
        setTotalArticles(data.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setError(err.message);
        setArticles([]);
        setTotalArticles(0);
        setLoading(false);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(totalArticles / itemsPerPage);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">📰 TrendWise - AI Generated Blog</h1>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">📰 TrendWise - AI Generated Blog</h1>
        <div className="text-center py-8">
          <p className="text-red-500">Error loading articles: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">📰 TrendWise - AI Generated Blog</h1>
      
      {/* Authentication Section */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          {!session ? 'Welcome, Guest!' : `Welcome, ${session.user?.name || 'User'}!`}
        </p>
        {!session ? (
          <button 
            onClick={() => signIn('google')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Sign In with Google
          </button>
        ) : (
          <button 
            onClick={() => signOut()}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
          >
            Sign Out
          </button>
        )}
      </div>
      
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full mb-6 p-2 border rounded bg-background text-foreground"
      />
      <ArticleGrid articles={articles} />
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${currentPage === i + 1 ? 'bg-primary text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      {/* <footer className="mt-12 text-center text-sm text-muted-foreground">
        © TrendWise – Powered by OpenAI & Next.js
      </footer> */}
    </div>
  );
}
