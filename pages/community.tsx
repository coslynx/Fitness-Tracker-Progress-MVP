import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { CommunityFeed, UserProfile } from '@/components/features/community';
import { Spinner } from '@/components/ui';
import { User } from '@/lib/types/user';

export default function Community() {
  const { data: session } = useSession();
  const { data: user, isLoading, error } = useUser();
  const router = useRouter();

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
        <p className="text-red-500">Error fetching user data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.goals.map((goal) => (
          <UserProfile key={goal.id} user={user} goal={goal} />
        ))}
      </div>
      <CommunityFeed />
    </div>
  );
}