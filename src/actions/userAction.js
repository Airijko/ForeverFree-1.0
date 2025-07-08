'use server';

import { connectToDB } from '@utils/database';
import User from '@models/user';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';

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
export const updateUser = async (id, updateData) => {
  const session = await getServerSession(options);
  if (!session?.user?.role || session.user.role !== 'admin') {
    return { error: 'Unauthorized: Admins only', status: 403 };
  }
  try {
    await connectToDB();
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();
    if (!user) {
      return { error: 'User not found', status: 404 };
    }
    revalidatePath('/dashboard/users');
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: 'Failed to update user', status: 500 };
  }
};

// Delete a user (admin only)
export const deleteUser = async (id) => {
  const session = await getServerSession(options);
  if (!session?.user?.role || session.user.role !== 'admin') {
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
