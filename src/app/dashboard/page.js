import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getDashboardStats, logVisit } from '@actions/statsAction';

// Heroicons
import {
  UsersIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  EyeIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@components/Layouts/DashboardLayout';

await logVisit();

const Dashboard = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/admin');
  }

  const stats = await getDashboardStats();
  return (
    <DashboardLayout>
      <div className="w-full max-w-2xl mx-auto p-8 bg-white/90 dark:bg-neutral-900/90 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 flex flex-col items-center mt-16">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-wide drop-shadow flex items-center gap-2">
          <ChartBarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Admin Dashboard
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg flex items-center gap-2">
          <UserCircleIcon className="h-6 w-6 text-amber-500 dark:text-amber-400" />
          Welcome, <span className="font-semibold">{session?.user?.email}</span>
        </p>
        <div className="grid grid-cols-2 gap-4 my-8 w-full">
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 flex flex-col items-center">
            <UsersIcon className="h-6 w-6 mb-1 text-blue-700 dark:text-blue-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Users
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {stats.totalUsers}
            </span>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 flex flex-col items-center">
            <UserGroupIcon className="h-6 w-6 mb-1 text-green-700 dark:text-green-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Currently Active
            </span>
            <span className="font-bold text-green-700 dark:text-green-300">
              {stats.currentlyActive}
            </span>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 flex flex-col items-center">
            <EyeIcon className="h-6 w-6 mb-1 text-amber-700 dark:text-amber-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Visits
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-300">
              {stats.totalVisits}
            </span>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4 flex flex-col items-center">
            <UserCircleIcon className="h-6 w-6 mb-1 text-purple-700 dark:text-purple-300" />
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
            <UsersIcon className="h-5 w-5 mb-1 text-blue-700 dark:text-blue-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Role
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {session?.user?.role ?? 'NULL'}
            </span>
          </div>
          <div className="flex-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 flex flex-col items-center">
            <UserCircleIcon className="h-5 w-5 mb-1 text-amber-700 dark:text-amber-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              User ID
            </span>
            <span className="font-mono text-amber-700 dark:text-amber-300 break-all">
              {session.user.id ?? 'NULL'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
          {/* User Management Card */}
          <Link
            href="/dashboard/users"
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 p-6 flex flex-col items-center text-center hover:bg-blue-50"
          >
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
              <UsersIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
              User Management
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Manage users, roles, and permissions.
            </p>
          </Link>

          {/* Community Management Card */}
          <Link
            href="/dashboard/communities"
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 p-6 flex flex-col items-center text-center hover:bg-amber-50"
          >
            <div className="bg-amber-100 text-amber-600 rounded-full p-3 mb-4">
              <BuildingOffice2Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700">
              Community Management
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Oversee churches, schools, and Christian orgs.
            </p>
          </Link>

          {/* Event Management Card */}
          <Link
            href="/dashboard/events"
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 p-6 flex flex-col items-center text-center hover:bg-green-50"
          >
            <div className="bg-green-100 text-green-600 rounded-full p-3 mb-4">
              <CalendarDaysIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700">
              Event Management
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Create, edit, and organize Christian events.
            </p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
