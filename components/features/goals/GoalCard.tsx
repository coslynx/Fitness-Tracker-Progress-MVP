import { Goal } from '@/lib/types/goal';
import { Card, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useGoal } from '@/lib/hooks/useGoal';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteGoal } = useGoal();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteGoal(goal.id);
      router.refresh();
    } catch (error) {
      // Handle error gracefully
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="cursor-pointer" onClick={() => router.push(`/goals/${goal.id}`)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{goal.name}</h2>
        <div className="flex gap-2">
          {session?.user?.id === goal.userId && (
            <>
              <Button
                variant="danger"
                size="small"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="small" color="white" /> : 'Delete'}
              </Button>
            </>
          )}
        </div>
      </div>
      <p className="text-gray-600">Target Date: {goal.targetDate.toLocaleDateString()}</p>
      <p className="text-gray-600">Progress: {goal.progress} / {goal.target}</p>
    </Card>
  );
};

export default GoalCard;