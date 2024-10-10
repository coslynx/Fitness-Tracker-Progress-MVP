import { Goal } from '@/lib/types/goal';
import { ProgressEntry } from '@/lib/types/progress';
import { User } from '@/lib/types/user';

/**
 * Validates a user object.
 *
 * @param user The user object to validate.
 * @returns An error message if the user is invalid, otherwise null.
 */
export const validateUser = (user: User): string | null => {
  if (!user.email || !user.password) {
    return 'Email and password are required.';
  }
  if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'Invalid email format.';
  }
  if (user.password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return null;
};

/**
 * Validates a goal object.
 *
 * @param goal The goal object to validate.
 * @returns An error message if the goal is invalid, otherwise null.
 */
export const validateGoal = (goal: Goal): string | null => {
  if (!goal.name || !goal.targetDate) {
    return 'Goal name and target date are required.';
  }
  if (goal.targetDate < new Date()) {
    return 'Target date must be in the future.';
  }
  return null;
};

/**
 * Validates a progress entry object.
 *
 * @param progressEntry The progress entry object to validate.
 * @returns An error message if the progress entry is invalid, otherwise null.
 */
export const validateProgressEntry = (progressEntry: ProgressEntry): string | null => {
  if (!progressEntry.value || !progressEntry.date || !progressEntry.goalId) {
    return 'Progress entry value, date, and goal ID are required.';
  }
  if (progressEntry.date < new Date()) {
    return 'Progress entry date must be in the past.';
  }
  return null;
};