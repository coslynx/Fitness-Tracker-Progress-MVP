import { useState, useEffect } from 'react';
import { useGoals } from '@/lib/hooks/useGoals';
import { GoalCard } from '@/components/features/goals/GoalCard';
import { Goal } from '@/lib/types/goal';
import { Spinner } from '@/components/ui';
import { Button } from '@/components/ui';
import { GoalForm } from '@/components/features/goals/GoalForm';

const GoalList = () => {
  const { data: goals, isLoading, error } = useGoals();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (error) {
      // Handle error by displaying an error message or logging it to the console
      console.error('Error fetching goals:', error);
    }
  }, [error]);

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
      <Button onClick={() => setShowForm(true)}>Add New Goal</Button>
      {showForm && <GoalForm onClose={() => setShowForm(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal: Goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default GoalList;