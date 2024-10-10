import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/lib/hooks/useUser';
import { Goal } from '@/lib/types/goal';
import { Card, Button, Spinner } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useGoal } from '@/lib/hooks/useGoal';

interface UserProfileProps {
  user: User;
  goal: Goal;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, goal }) => {
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
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">{goal.name}</h2>
        <p className="text-gray-600">Target Date: {goal.targetDate.toLocaleDateString()}</p>
        <p className="text-gray-600">Progress: {goal.progress} / {goal.target}</p>
        {session?.user?.id === goal.userId && (
          <Button
            variant="danger"
            size="small"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="small" color="white" /> : 'Delete'}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserProfile;