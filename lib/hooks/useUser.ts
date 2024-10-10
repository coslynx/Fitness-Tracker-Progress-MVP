import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/lib/types/user';
import { fetchUser, updateUser } from '@/lib/api/client';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export const useUser = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserSession } = useContext(AuthContext);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUser();
      setUser(data);
      setUserSession(data); // Update global auth context
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser: User) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await updateUser(updatedUser);
      setUser(data);
      setUserSession(data); // Update global auth context
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  return {
    data: user,
    isLoading,
    error,
    updateUser,
  };
};