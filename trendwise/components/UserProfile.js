'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function UserProfile() {
  const { data: session, status } = useSession();
  
  const user = session?.user?.name || 'Guest';

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Welcome, {user}</span>
      {!session ? (
        <button 
          onClick={() => signIn('google')}
          className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
        >
          Sign In
        </button>
      ) : (
        <button 
          onClick={() => signOut()}
          className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        >
          Sign Out
        </button>
      )}
    </div>
  );
} 