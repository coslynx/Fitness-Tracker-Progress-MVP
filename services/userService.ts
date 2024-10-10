import { User, UserType } from '@/lib/types/user';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './hashService'; 

const prisma = new PrismaClient();

// Function to register a new user
export const signup = async (user: UserType): Promise<User> => {
  try {
    // Validate user input
    const validationError = validateUser(user);
    if (validationError) {
      throw new Error(validationError);
    }

    // Hash the user's password before storing it
    const hashedPassword = await hashPassword(user.password);

    // Create a new user in the database
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

// Function to update a user's profile information
export const updateUserProfile = async (updatedUser: UserType): Promise<User> => {
  try {
    // Validate user input
    const validationError = validateUser(updatedUser);
    if (validationError) {
      throw new Error(validationError);
    }

    // Hash the updated password if provided
    const updatedPassword = updatedUser.password
      ? await hashPassword(updatedUser.password)
      : undefined;

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: updatedUser.id },
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

// Function for user login
export const login = async (user: UserType): Promise<User | null> => {
  try {
    // Find the user in the database
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await hashPassword(user.password) === existingUser.password;

    if (!isValidPassword) {
      throw new Error('Incorrect password');
    }

    return existingUser;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed');
  }
};

// Function to validate user input
function validateUser(user: UserType): string | null {
  if (!user.email || !user.password) {
    return 'Email and password are required.';
  }
  if (!user.email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) {
    return 'Invalid email format.';
  }
  if (user.password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return null;
}