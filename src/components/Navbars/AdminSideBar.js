import Link from 'next/link';
import {
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

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
    <aside className="flex w-64 flex-col gap-4 border-r border-gray-200 bg-white/90 p-6 py-32 dark:border-neutral-800 dark:bg-neutral-900/90">
      <h2 className="mb-8 text-2xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100">
        Admin Panel
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
    </aside>
  );
};

export default AdminSideBar;
