import { Goal, GoalType } from '@/lib/types/goal';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/services/userService'; 

const prisma = new PrismaClient();

// Create a new Goal
export const createGoal = async (goal: GoalType): Promise<Goal> => {
  try {
    // Ensure the goal data is valid
    const validatedGoal = validateGoal(goal);
    if (validatedGoal) {
      throw new Error(validatedGoal);
    }

    // Create the goal in the database
    const newGoal = await prisma.goal.create({
      data: {
        name: goal.name,
        targetDate: goal.targetDate,
        progress: 0, // Initialize progress to 0
        target: goal.target, // Assuming target is provided
        userId: goal.userId,
      },
    });

    // Return the newly created Goal
    return newGoal;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
};

// Update an existing Goal
export const updateGoal = async (id: number, updatedGoal: GoalType): Promise<Goal> => {
  try {
    // Ensure the goal data is valid
    const validatedGoal = validateGoal(updatedGoal);
    if (validatedGoal) {
      throw new Error(validatedGoal);
    }

    // Update the goal in the database
    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: {
        name: updatedGoal.name,
        targetDate: updatedGoal.targetDate,
        progress: updatedGoal.progress,
        target: updatedGoal.target,
      },
    });

    // Return the updated Goal
    return updatedGoal;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw new Error('Failed to update goal');
  }
};

// Delete a Goal
export const deleteGoal = async (id: number): Promise<void> => {
  try {
    // Delete the goal from the database
    await prisma.goal.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw new Error('Failed to delete goal');
  }
};

// Get a Goal by ID
export const getGoalById = async (id: number): Promise<Goal | null> => {
  try {
    // Find the goal in the database
    const goal = await prisma.goal.findUnique({
      where: { id },
    });

    // Return the found Goal
    return goal;
  } catch (error) {
    console.error('Error fetching goal:', error);
    throw new Error('Failed to fetch goal');
  }
};

// Validate Goal data
function validateGoal(goal: GoalType): string | null {
  if (!goal.name || !goal.targetDate || !goal.target) {
    return 'Goal name, target date, and target are required.';
  }
  if (goal.targetDate < new Date()) {
    return 'Target date must be in the future.';
  }
  return null;
}