import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@components/Layouts/DashboardLayout';
import { getDashboardStats, logVisit } from '@actions/statsAction';

await logVisit();

const Dashboard = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/admin');
  }

  const stats = await getDashboardStats();
  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl h-full mx-auto p-8  flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-wide drop-shadow">
            Admin Dashboard
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">
            Welcome,{' '}
            <span className="font-semibold">{session?.user?.email}</span>
          </p>
          <div className="grid grid-cols-2 gap-4 my-8 w-full">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total Users
              </span>
              <span className="font-bold text-blue-700 dark:text-blue-300">
                {stats.totalUsers}
              </span>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Currently Active
              </span>
              <span className="font-bold text-green-700 dark:text-green-300">
                {stats.currentlyActive}
              </span>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total Visits
              </span>
              <span className="font-bold text-amber-700 dark:text-amber-300">
                {stats.totalVisits}
              </span>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Unique Visitors
              </span>
              <span className="font-bold text-purple-700 dark:text-purple-300">
                {stats.uniqueVisitors}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
            <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Role
              </span>
              <span className="font-bold text-blue-700 dark:text-blue-300">
                {session?.user?.role ?? 'NULL'}
              </span>
            </div>
            <div className="flex-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                User ID
              </span>
              <span className="font-mono text-amber-700 dark:text-amber-300 break-all">
                {session.user.id ?? 'NULL'}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <Link
              href="/dashboard/users"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              User Management
            </Link>
            <Link
              href="/dashboard/events"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
            >
              Event Management
            </Link>
            <Link
              href="/dashboard/communities"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition"
            >
              Community Management
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
