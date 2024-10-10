import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/lib/hooks/useProgress';
import { ProgressChart, ProgressLog } from '@/components/features/progress';
import { Spinner } from '@/components/ui';
import { User } from '@/lib/types/user';

export default function Progress() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: progress, isLoading, error } = useProgress();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error fetching progress data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressChart progress={progress} />
        <ProgressLog progress={progress} />
      </div>
    </div>
  );
}