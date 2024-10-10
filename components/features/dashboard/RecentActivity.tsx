import { useState, useEffect } from 'react';
import { ProgressEntry } from '@/lib/types/progress';
import { Goal } from '@/lib/types/goal';
import { Card, Button, Spinner } from '@/components/ui';
import { useGoals } from '@/lib/hooks/useGoals';
import { useProgress } from '@/lib/hooks/useProgress';
import { formatDate } from '@/lib/utils/formatters';

interface RecentActivityProps {
  progress: ProgressEntry[];
  goals: Goal[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ progress, goals }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<
    { type: 'goal' | 'progress'; data: Goal | ProgressEntry; date: Date }[]
  >([]);

  useEffect(() => {
    const combinedActivities = [...progress, ...goals].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    const recent = combinedActivities
      .slice(0, 5) // Limit to 5 recent activities
      .map((activity) => ({
        type: activity instanceof Goal ? 'goal' : 'progress',
        data: activity,
        date: activity.date,
      }));

    setRecentActivities(recent);
    setIsLoading(false);
  }, [progress, goals]);

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
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        {recentActivities.map((activity) => (
          <li key={activity.data.id}>
            <div className="flex justify-between items-center">
              <div>
                {activity.type === 'goal' ? (
                  <p className="text-gray-600 font-medium">
                    Created Goal: {activity.data.name}
                  </p>
                ) : (
                  <p className="text-gray-600 font-medium">
                    Logged Progress: {activity.data.value}
                  </p>
                )}
                <p className="text-gray-400 text-sm">
                  {formatDate(activity.date)}
                </p>
              </div>
              {activity.type === 'goal' && (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    // Navigate to goal details (optional)
                  }}
                >
                  View Goal
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity;