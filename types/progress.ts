import { ProgressEntry, ProgressEntryType } from '@/lib/types/progress';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/services/userService'; // Assuming hashPassword function exists in userService.ts

const prisma = new PrismaClient();

export const createProgressEntry = async (
  progressEntry: ProgressEntryType
): Promise<ProgressEntry> => {
  try {
    const newProgressEntry = await prisma.progressEntry.create({
      data: {
        goalId: progressEntry.goalId,
        value: progressEntry.value,
        date: progressEntry.date,
        userId: progressEntry.userId,
      },
    });

    return newProgressEntry;
  } catch (error) {
    console.error('Error creating progress entry:', error);
    throw new Error('Failed to create progress entry');
  }
};

export const updateProgressEntry = async (
  id: number,
  updatedProgressEntry: ProgressEntryType
): Promise<ProgressEntry> => {
  try {
    const updatedProgressEntry = await prisma.progressEntry.update({
      where: { id },
      data: {
        goalId: updatedProgressEntry.goalId,
        value: updatedProgressEntry.value,
        date: updatedProgressEntry.date,
      },
    });

    return updatedProgressEntry;
  } catch (error) {
    console.error('Error updating progress entry:', error);
    throw new Error('Failed to update progress entry');
  }
};

export const deleteProgressEntry = async (id: number): Promise<void> => {
  try {
    await prisma.progressEntry.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    throw new Error('Failed to delete progress entry');
  }
};

export const getProgressEntryById = async (
  id: number
): Promise<ProgressEntry | null> => {
  try {
    const progressEntry = await prisma.progressEntry.findUnique({
      where: { id },
    });

    return progressEntry;
  } catch (error) {
    console.error('Error fetching progress entry:', error);
    throw new Error('Failed to fetch progress entry');
  }
};