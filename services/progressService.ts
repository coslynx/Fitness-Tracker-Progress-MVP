import { ProgressEntry, ProgressEntryType } from '@/lib/types/progress';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new Progress Entry
export const createProgressEntry = async (
  progressEntry: ProgressEntryType
): Promise<ProgressEntry> => {
  try {
    // Ensure the progress entry data is valid
    const validatedProgressEntry = validateProgressEntry(progressEntry);
    if (validatedProgressEntry) {
      throw new Error(validatedProgressEntry);
    }

    // Create the progress entry in the database
    const newProgressEntry = await prisma.progressEntry.create({
      data: {
        goalId: progressEntry.goalId,
        value: progressEntry.value,
        date: progressEntry.date,
        userId: progressEntry.userId,
      },
    });

    // Return the newly created Progress Entry
    return newProgressEntry;
  } catch (error) {
    console.error('Error creating progress entry:', error);
    throw new Error('Failed to create progress entry');
  }
};

// Update an existing Progress Entry
export const updateProgressEntry = async (
  id: number,
  updatedProgressEntry: ProgressEntryType
): Promise<ProgressEntry> => {
  try {
    // Ensure the progress entry data is valid
    const validatedProgressEntry = validateProgressEntry(updatedProgressEntry);
    if (validatedProgressEntry) {
      throw new Error(validatedProgressEntry);
    }

    // Update the progress entry in the database
    const updatedProgressEntry = await prisma.progressEntry.update({
      where: { id },
      data: {
        goalId: updatedProgressEntry.goalId,
        value: updatedProgressEntry.value,
        date: updatedProgressEntry.date,
      },
    });

    // Return the updated Progress Entry
    return updatedProgressEntry;
  } catch (error) {
    console.error('Error updating progress entry:', error);
    throw new Error('Failed to update progress entry');
  }
};

// Delete a Progress Entry
export const deleteProgressEntry = async (id: number): Promise<void> => {
  try {
    // Delete the progress entry from the database
    await prisma.progressEntry.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    throw new Error('Failed to delete progress entry');
  }
};

// Get a Progress Entry by ID
export const getProgressEntryById = async (
  id: number
): Promise<ProgressEntry | null> => {
  try {
    // Find the progress entry in the database
    const progressEntry = await prisma.progressEntry.findUnique({
      where: { id },
    });

    // Return the found Progress Entry
    return progressEntry;
  } catch (error) {
    console.error('Error fetching progress entry:', error);
    throw new Error('Failed to fetch progress entry');
  }
};

// Validate Progress Entry data
function validateProgressEntry(progressEntry: ProgressEntryType): string | null {
  if (!progressEntry.value || !progressEntry.date || !progressEntry.goalId) {
    return 'Progress entry value, date, and goal ID are required.';
  }
  if (progressEntry.date < new Date()) {
    return 'Progress entry date must be in the past.';
  }
  return null;
}