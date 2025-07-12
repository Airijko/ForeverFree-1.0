import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
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

const Dashboard = async () => {
  await logVisit();
  const session = await getServerSession(options);
  const stats = await getDashboardStats();

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-xl border border-gray-200 bg-white/90 p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900/90">
        <h1 className="mb-2 flex items-center gap-2 text-4xl font-extrabold tracking-wide text-gray-900 drop-shadow dark:text-gray-100">
          <ChartBarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Admin Dashboard
        </h1>
        <p className="mb-6 flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400">
          <UserCircleIcon className="h-6 w-6 text-amber-500 dark:text-amber-400" />
          Welcome, <span className="font-semibold">{session?.user?.email}</span>
        </p>
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
          {/* User Management Card */}
          <Link
            href="/dashboard/users"
            className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md transition-all hover:bg-blue-50 hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600">
              <UsersIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
              User Management
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Manage users, roles, and permissions.
            </p>
          </Link>

          {/* Community Management Card */}
          <Link
            href="/dashboard/communities"
            className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md transition-all hover:bg-amber-50 hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-amber-100 p-3 text-amber-600">
              <BuildingOffice2Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700">
              Community Management
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Oversee churches, schools, and Christian orgs.
            </p>
          </Link>

          {/* Event Management Card */}
          <Link
            href="/dashboard/events"
            className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md transition-all hover:bg-green-50 hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
              <CalendarDaysIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700">
              Event Management
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Create, edit, and organize Christian events.
            </p>
          </Link>
        </div>
        <div className="my-8 grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col items-center rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
            <UsersIcon className="mb-1 h-6 w-6 text-blue-700 dark:text-blue-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Users
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {stats.totalUsers}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-green-100 p-4 dark:bg-green-900/30">
            <UserGroupIcon className="mb-1 h-6 w-6 text-green-700 dark:text-green-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Currently Active
            </span>
            <span className="font-bold text-green-700 dark:text-green-300">
              {stats.currentlyActive}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-amber-100 p-4 dark:bg-amber-900/30">
            <EyeIcon className="mb-1 h-6 w-6 text-amber-700 dark:text-amber-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Visits
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-300">
              {stats.totalVisits}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-purple-100 p-4 dark:bg-purple-900/30">
            <UserCircleIcon className="mb-1 h-6 w-6 text-purple-700 dark:text-purple-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Unique Visitors
            </span>
            <span className="font-bold text-purple-700 dark:text-purple-300">
              {stats.uniqueVisitors}
            </span>
          </div>
        </div>
        <div className="mb-8 flex w-full flex-col justify-center gap-4 sm:flex-row">
          <div className="flex flex-1 flex-col items-center rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
            <UsersIcon className="mb-1 h-5 w-5 text-blue-700 dark:text-blue-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Role
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {session?.user?.role ?? 'NULL'}
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-lg bg-amber-100 p-4 dark:bg-amber-900/30">
            <UserCircleIcon className="mb-1 h-5 w-5 text-amber-700 dark:text-amber-300" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              User ID
            </span>
            <span className="break-all font-mono text-amber-700 dark:text-amber-300">
              {session?.user.id ?? 'NULL'}
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
