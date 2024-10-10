import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Goal } from '@/lib/types/goal';
import { fetchGoals, createGoal, updateGoal, deleteGoal } from '@/lib/api/client';

export const useGoals = () => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGoals();
      setGoals(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addGoal = async (newGoal: Goal) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await createGoal(newGoal);
      setGoals((prev) => [...prev, data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGoal = async (id: number, updatedGoal: Goal) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await updateGoal(id, updatedGoal);
      setGoals((prev) => prev.map((goal) => (goal.id === id ? data : goal)));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGoal = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteGoal(id);
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchGoals();
    }
  }, [session]);

  return {
    data: goals,
    isLoading,
    error,
    addGoal,
    updateGoal,
    deleteGoal,
  };
};