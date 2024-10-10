import { Goal } from '@/lib/types/goal';
import { ProgressEntry } from '@/lib/types/progress';

/**
 * Calculates the percentage of progress for a given goal.
 * @param goal The goal object.
 * @returns The percentage of progress completed for the goal.
 */
export const calculateGoalProgress = (goal: Goal): number => {
  if (!goal || !goal.target || !goal.progress) {
    return 0; // Handle cases where goal data is incomplete or invalid
  }

  return (goal.progress / goal.target) * 100;
};

/**
 * Calculates the average progress value for a given list of progress entries.
 * @param progressEntries The list of progress entries.
 * @returns The average progress value, or null if the list is empty.
 */
export const calculateAverageProgress = (progressEntries: ProgressEntry[]): number | null => {
  if (progressEntries.length === 0) {
    return null; // Handle cases where there are no progress entries
  }

  const totalProgress = progressEntries.reduce((sum, entry) => sum + entry.value, 0);

  return totalProgress / progressEntries.length;
};

/**
 * Calculates the difference in weight between two progress entries.
 * @param entry1 The first progress entry.
 * @param entry2 The second progress entry.
 * @returns The difference in weight between the two entries, or null if either entry is missing weight data.
 */
export const calculateWeightDifference = (entry1: ProgressEntry, entry2: ProgressEntry): number | null => {
  if (!entry1 || !entry1.value || !entry2 || !entry2.value) {
    return null; // Handle cases where weight data is missing
  }

  return entry1.value - entry2.value;
};