'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const { data: session } = useSession();
  
  const user = session?.user?.name || 'Guest';

  useEffect(() => {
    fetch(`/api/comments?articleId=${articleId}`)
      .then(res => res.json())
      .then(setComments);
  }, [articleId]);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ articleId, content: input, user: user })
    });
    setInput('');
    const res = await fetch(`/api/comments?articleId=${articleId}`);
    setComments(await res.json());
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Comments</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="w-full p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="btn btn-primary">Submit</button>
      </form>
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c._id} className="border-b pb-2">{c.user}: {c.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection; 