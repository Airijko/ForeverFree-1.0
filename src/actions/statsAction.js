'use server';

import Visit from '@models/visit';
import User from '@models/user';
import { connectToDB } from '@utils/database';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';

export const getDashboardStats = async () => {
  await connectToDB();
  const totalUsers = await User.countDocuments();
  const totalVisits = await Visit.countDocuments();
  const uniqueVisitors = await Visit.distinct('userId').then(
    (ids) => ids.filter(Boolean).length
  );

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const currentlyActive = await User.countDocuments({
    lastVisitedAt: { $gte: tenMinutesAgo },
  });

  return {
    totalUsers,
    totalVisits,
    uniqueVisitors,
    currentlyActive,
  };
};

export const logVisit = async (ip) => {
  await connectToDB();
  const session = await getServerSession(options);
  const userId = session?.user?.id || null;
  await Visit.create({ userId, ip });
  if (userId) {
    // Optionally update lastVisitedAt for user
    const User = (await import('@models/user')).default;
    await User.findByIdAndUpdate(userId, { lastVisitedAt: new Date() });
  }
};
