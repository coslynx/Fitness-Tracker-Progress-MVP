import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useGoals } from '@/lib/hooks/useGoals';
import { GoalCard, GoalForm } from '@/components/features/goals';
import { Spinner } from '@/components/ui';
import { Goal } from '@/lib/types/goal';

export default function Goals() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: goals, isLoading, error } = useGoals();

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
        <p className="text-red-500">Error fetching goals data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal: Goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <GoalForm />
    </div>
  );
}