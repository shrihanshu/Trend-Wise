'use client';
import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    const res = await fetch('/api/trends');
    const data = await res.json();
    setTrends(data);
  };

  const generate = async (title) => {
    setLoading(true);
    const prompt = `Write a detailed SEO-optimized blog on: ${title}`;
    await fetch('/api/article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug: title.toLowerCase().replace(/\s+/g, '-'), meta: title, prompt })
    });
    setLoading(false);
  };

  useEffect(() => { fetchTrends(); }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin: Generate Articles</h1>
      {trends.map((t, i) => (
        <div key={i} className="flex justify-between items-center p-2 border-b">
          <span>{t.title}</span>
          <button
            onClick={() => generate(t.title)}
            className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
            disabled={loading}
          >Generate</button>
        </div>
      ))}
    </div>
  );
}