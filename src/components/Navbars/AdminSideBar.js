import Link from 'next/link';
import {
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const navLinks = [
  { label: 'Overview', href: '/dashboard', icon: HomeIcon },
  { label: 'User Management', href: '/dashboard/users', icon: UsersIcon },
  {
    label: 'Event Management',
    href: '/dashboard/events',
    icon: CalendarDaysIcon,
  },
  {
    label: 'Organization Management',
    href: '/dashboard/communities',
    icon: BuildingOffice2Icon,
  },
];

const AdminSideBar = () => {
  return (
    <aside className="flex w-64 flex-col justify-between border-r border-gray-200 bg-white/90 p-6 dark:border-neutral-800 dark:bg-neutral-900/90">
      <div>
        <Link
          href="/"
          aria-label="Go to homepage"
          className="group mx-auto mb-3 flex flex-row items-center gap-1 rounded-lg bg-gradient-to-r from-amber-100 via-white to-blue-100 px-5 py-3 shadow transition-all duration-300 hover:scale-105 hover:from-amber-200 hover:to-blue-200 md:mx-0"
        >
          <Image
            src="/assets/icons/ForeverFree_Logo.png"
            width={30}
            height={30}
            alt="ForeverFree Logo"
            className="drop-shadow-[0_0_2px_black]"
          />
          <h1 className="select-none text-xl font-extrabold tracking-wide text-gray-900 transition-colors duration-200 group-hover:text-amber-600 dark:text-gray-100 dark:group-hover:text-amber-400">
            Forever Free
          </h1>
        </Link>
        <h2 className="mb-8 bg-gradient-to-r from-amber-500 via-blue-400 to-blue-700 bg-clip-text pt-24 text-2xl font-extrabold tracking-wide text-transparent drop-shadow-lg dark:from-amber-300 dark:via-blue-300 dark:to-blue-500">
          <span className="inline-flex items-center gap-2">
            <CpuChipIcon className="h-7 w-7 text-blue-500 dark:text-blue-300" />
            Admin Panel
          </span>
        </h2>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-md px-4 py-2 font-semibold text-gray-700 transition hover:bg-blue-600 hover:text-white dark:text-gray-200 dark:hover:bg-blue-700"
            >
              <link.icon className="h-5 w-5" aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSideBar;
