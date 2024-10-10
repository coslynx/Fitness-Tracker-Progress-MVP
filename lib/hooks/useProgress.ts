import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ProgressEntry } from '@/lib/types/progress';
import { fetchProgressEntries, createProgressEntry, updateProgressEntry, deleteProgressEntry } from '@/lib/api/client';

export const useProgress = () => {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProgress = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchProgressEntries();
      setProgress(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProgressEntry = async (newEntry: ProgressEntry) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await createProgressEntry(newEntry);
      setProgress((prev) => [...prev, data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgressEntry = async (id: number, updatedEntry: ProgressEntry) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await updateProgressEntry(id, updatedEntry);
      setProgress((prev) => prev.map((entry) => (entry.id === id ? data : entry)));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProgressEntry = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteProgressEntry(id);
      setProgress((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProgress();
    }
  }, [session]);

  return {
    data: progress,
    isLoading,
    error,
    addProgressEntry,
    updateProgressEntry,
    deleteProgressEntry,
  };
};