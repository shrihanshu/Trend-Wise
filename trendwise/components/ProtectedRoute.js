'use client';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children, fallback = null }) {
  const { data: session, status } = useSession();
  
  const user = session?.user?.name || 'Guest';

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return fallback || (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-4">Please sign in to access this content.</p>
        <button 
          onClick={() => signIn()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Sign In
        </button>
      </div>
    );
  }

  return children;
} 