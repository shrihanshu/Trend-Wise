'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CommentBox({ slug }) {
  const { data: session } = useSession();
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleSlug: slug, userEmail: session?.user?.email, content: text })
    });
    setText('');
  };

  if (!session) return null;

  return (
    <div className="mt-6">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 mt-2 rounded"
        onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}