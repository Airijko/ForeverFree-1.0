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
    <aside className="w-64 bg-white/90 dark:bg-neutral-900/90 border-r border-gray-200 dark:border-neutral-800 p-6 flex flex-col gap-4 py-32">
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 tracking-wide">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition"
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
