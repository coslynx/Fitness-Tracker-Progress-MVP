import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { useUser } from '@/lib/hooks/useUser';
import { useGoals } from '@/lib/hooks/useGoals';
import { useProgress } from '@/lib/hooks/useProgress';
import { Header, Footer, Sidebar } from '@/components/layout';
import { Spinner } from '@/components/ui';
import { User } from '@/lib/types/user';
import { Goal } from '@/lib/types/goal';
import { ProgressEntry } from '@/lib/types/progress';

interface LayoutProps {
  user: User | null;
  goals: Goal[];
  progress: ProgressEntry[];
  children: React.ReactNode;
}

export default function Layout({ user, goals, progress, children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && goals && progress) {
      setIsLoading(false);
    }
  }, [user, goals, progress]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <SessionProvider session={user ? { user } : null}>
      <ThemeProvider>
        <div className="flex min-h-screen">
          <Sidebar user={user} />
          <div className="flex flex-col flex-1">
            <Header user={user} />
            <main className="flex flex-1 overflow-y-auto">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}