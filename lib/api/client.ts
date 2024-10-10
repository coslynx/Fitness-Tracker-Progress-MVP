import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Goal } from '@/lib/types/goal';
import { ProgressEntry } from '@/lib/types/progress';
import { User } from '@/lib/types/user';

const API_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// Create an axios instance with a base URL for API requests.
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Define functions for fetching, creating, updating, and deleting goals.
export const fetchGoals = async (): Promise<Goal[]> => {
  const response = await apiClient.get('/api/goals');
  return response.data;
};

export const createGoal = async (goal: Goal): Promise<Goal> => {
  const response = await apiClient.post('/api/goals', goal);
  return response.data;
};

export const updateGoal = async (id: number, goal: Goal): Promise<Goal> => {
  const response = await apiClient.put(`/api/goals/${id}`, goal);
  return response.data;
};

export const deleteGoal = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/goals/${id}`);
};

// Define functions for fetching, creating, updating, and deleting progress entries.
export const fetchProgressEntries = async (): Promise<ProgressEntry[]> => {
  const response = await apiClient.get('/api/progress');
  return response.data;
};

export const createProgressEntry = async (
  progressEntry: ProgressEntry
): Promise<ProgressEntry> => {
  const response = await apiClient.post('/api/progress', progressEntry);
  return response.data;
};

export const updateProgressEntry = async (
  id: number,
  progressEntry: ProgressEntry
): Promise<ProgressEntry> => {
  const response = await apiClient.put(`/api/progress/${id}`, progressEntry);
  return response.data;
};

export const deleteProgressEntry = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/progress/${id}`);
};

// Define functions for fetching and updating user profile information.
export const fetchUser = async (): Promise<User> => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await apiClient.put('/api/users/me', user);
  return response.data;
};