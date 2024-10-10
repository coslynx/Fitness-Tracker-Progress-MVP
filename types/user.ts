import { User, UserType } from '@/lib/types/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface User {
  id: number;
  email: string;
  password: string;
  goals: Goal[];
}

export const createUser = async (user: UserType): Promise<User> => {
  try {
    const hashedPassword = await hashPassword(user.password); // Assuming hashPassword is defined in userService.ts

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        goals: [],
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (id: number, updatedUser: UserType): Promise<User> => {
  try {
    const updatedPassword = updatedUser.password ? await hashPassword(updatedUser.password) : undefined;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: updatedUser.email,
        password: updatedPassword,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};