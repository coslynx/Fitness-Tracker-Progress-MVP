import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useGoals } from '@/lib/hooks/useGoals';
import { useProgress } from '@/lib/hooks/useProgress';
import { Layout } from '@/components/layout';
import { Spinner } from '@/components/ui';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const { data: goals, isLoading: goalsLoading, error: goalsError } = useGoals();
  const { data: progress, isLoading: progressLoading, error: progressError } = useProgress();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoading || goalsLoading || progressLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userLoading, goalsLoading, progressLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (userError || goalsError || progressError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error fetching data. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout user={user} goals={goals} progress={progress}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}