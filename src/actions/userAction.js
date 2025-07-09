'use server';

import { connectToDB } from '@utils/database';
import User from '@models/user';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Utility: Check if current session is admin
const isAdmin = async () => {
  const session = await getServerSession(options);
  return session?.user?.role === 'admin';
};

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find().lean();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error('Error fetching users:', error);
    return { error: 'Failed to fetch users', status: 500 };
  }
};

// Fetch a single user by ID
export const fetchUser = async (id) => {
  try {
    await connectToDB();
    const user = await User.findById(id).lean();
    if (!user) {
      return { error: 'User not found', status: 404 };
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    return { error: 'Failed to fetch user', status: 500 };
  }
};

// Update a user (admin only)
export const updateUser = async (userId, updatedData) => {
  const session = await getServerSession(options);

  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized: Admins only');
  }

  await connectToDB();
  await User.findByIdAndUpdate(userId, updatedData);

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

// Delete a user (admin only)
export const deleteUser = async (id) => {
  if (!(await isAdmin())) {
    return { error: 'Unauthorized: Admins only', status: 403 };
  }
  try {
    await connectToDB();
    await User.findByIdAndDelete(id);
    revalidatePath('/dashboard/users');
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error: 'Failed to delete user', status: 500 };
  }
};
