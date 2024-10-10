import { useState, useEffect } from 'react';
import { User } from '@/lib/types/user';
import { Goal } from '@/lib/types/goal';
import { ProgressEntry } from '@/lib/types/progress';
import { Card, Button } from '@/components/ui';
import { useGoals } from '@/lib/hooks/useGoals';
import { useProgress } from '@/lib/hooks/useProgress';
import { formatDate } from '@/lib/utils/formatters';

interface DashboardStatsProps {
  user: User | null;
  goals: Goal[];
  progress: ProgressEntry[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user, goals, progress }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [recentWeight, setRecentWeight] = useState(null);

  useEffect(() => {
    if (goals && progress) {
      const completed = goals.filter((goal) => goal.progress >= goal.target).length;
      const total = goals.length;

      const weightEntry = progress.reduce(
        (prev, curr) => (curr.date > prev.date ? curr : prev),
        { date: new Date(0), value: 0 }
      );

      setCompletedGoals(completed);
      setTotalGoals(total);
      setRecentWeight(weightEntry.value);
      setIsLoading(false);
    }
  }, [goals, progress]);

  if (isLoading) {
    return (
      <Card className="h-full">
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-4">Your Stats</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 font-medium">Completed Goals:</p>
          <p className="text-lg font-semibold">{completedGoals} / {totalGoals}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 font-medium">Recent Weight:</p>
          <p className="text-lg font-semibold">{recentWeight} lbs</p>
        </div>
        {user && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 font-medium">Last Active:</p>
            <p className="text-lg font-semibold">{formatDate(user.lastActive)}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DashboardStats;