import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useGoals } from '@/lib/hooks/useGoals';
import { useProgress } from '@/lib/hooks/useProgress';
import { DashboardStats, RecentActivity } from '@/components/features/dashboard';
import { Spinner } from '@/components/ui';
import { User } from '@/lib/types/user';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardStats user={user} goals={goals} progress={progress} />
        <RecentActivity progress={progress} goals={goals} />
      </div>
    </div>
  );
}