'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button 
          onClick={() => signIn('google')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Sign In
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
  );
} 