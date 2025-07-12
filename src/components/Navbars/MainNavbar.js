import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import ThemeToggle from '../ThemeToggle';

import {
  HomeIcon,
  UsersIcon,
  FlagIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const MainSidebar = async () => {
  const session = await getServerSession(options);
  const isAdmin = session?.user?.role === 'admin';

  const navItems = [
    ...(isAdmin
      ? [{ label: 'Dashboard', href: '/dashboard', icon: HomeIcon }]
      : []),
    { label: 'Communities', href: '/communities', icon: UsersIcon },
    { label: 'Events', href: '/events', icon: CalendarIcon },
    { label: 'Reconquista', href: '/reconquista', icon: FlagIcon },
  ];

  return (
    <aside className="sticky top-0 z-50 flex h-screen w-max flex-shrink-0 flex-col justify-between gap-2 overflow-hidden px-5 py-5">
      <nav className="ml-auto flex w-max flex-col items-center gap-4 md:items-start">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="group mx-auto mb-3 flex flex-row items-center gap-1 transition-all duration-300 hover:scale-105 md:mx-0"
        >
          <Image
            src="/assets/icons/ForeverFree_Logo.png"
            width={50}
            height={50}
            alt="ForeverFree Logo"
            className="drop-shadow-[0_0_2px_black]"
          />
          <h1 className="hidden select-none whitespace-nowrap text-3xl font-extrabold tracking-wide text-gray-900 transition-colors duration-200 group-hover:text-amber-600 dark:text-gray-100 dark:group-hover:text-amber-400 lg:block">
            Forever Free
          </h1>
        </Link>
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="mx-auto flex flex-row items-center gap-2 rounded-lg px-2 py-2 hover:bg-amber-700 hover:text-white hover:transition-all hover:duration-300 dark:hover:text-white md:mx-0 md:w-full"
          >
            <Icon className="h-10 w-10" aria-hidden="true" />
            <span className="hidden text-2xl lg:block">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex w-full flex-col items-center gap-4 lg:flex-row">
        <ThemeToggle />
        <div className="w-full">
          {session ? (
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="flex select-none justify-center rounded-xl border border-gray-200 bg-black px-4 py-2 font-semibold text-white shadow backdrop-blur-md transition-all duration-200 hover:bg-amber-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-amber-400 dark:hover:text-black"
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="flex select-none justify-center rounded-xl border border-gray-200 bg-black px-4 py-2 font-semibold text-white shadow backdrop-blur-md transition-all duration-200 hover:bg-amber-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-amber-400 dark:hover:text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default MainSidebar;
