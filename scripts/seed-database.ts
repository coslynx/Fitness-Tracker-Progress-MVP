import { PrismaClient } from '@prisma/client';
import { UserType } from '@/lib/types/user';
import { GoalType } from '@/lib/types/goal';
import { ProgressEntryType } from '@/lib/types/progress';
import { hashPassword } from '@/services/userService';

const prisma = new PrismaClient();

// Seed database with initial data
async function seedDatabase() {
  try {
    // Seed Users
    const user1: UserType = {
      email: 'user1@example.com',
      password: 'password123',
    };
    const user2: UserType = {
      email: 'user2@example.com',
      password: 'securepass456',
    };
    await prisma.user.create({
      data: {
        ...user1,
        password: await hashPassword(user1.password),
      },
    });
    await prisma.user.create({
      data: {
        ...user2,
        password: await hashPassword(user2.password),
      },
    });

    // Seed Goals
    const goal1: GoalType = {
      name: 'Lose 10 pounds',
      targetDate: new Date('2024-06-01'),
      progress: 0,
      target: 10,
      userId: 1,
    };
    const goal2: GoalType = {
      name: 'Run 5K',
      targetDate: new Date('2024-05-15'),
      progress: 0,
      target: 5,
      userId: 2,
    };
    await prisma.goal.create({
      data: goal1,
    });
    await prisma.goal.create({
      data: goal2,
    });

    // Seed Progress Entries
    const progressEntry1: ProgressEntryType = {
      goalId: 1,
      value: 175,
      date: new Date('2024-04-01'),
      userId: 1,
    };
    const progressEntry2: ProgressEntryType = {
      goalId: 2,
      value: 3,
      date: new Date('2024-04-01'),
      userId: 2,
    };
    await prisma.progressEntry.create({
      data: progressEntry1,
    });
    await prisma.progressEntry.create({
      data: progressEntry2,
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();