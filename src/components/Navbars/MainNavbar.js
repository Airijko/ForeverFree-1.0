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
  CpuChipIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const TopNavbar = async () => {
  const session = await getServerSession(options);
  const isAdmin = session?.user?.role === 'admin';

  const navItems = [
    ...(isAdmin
      ? [{ label: 'Dashboard', href: '/dashboard', icon: CpuChipIcon }]
      : []),
    { label: 'Home', href: '/', icon: HomeIcon },
    { label: 'Communities', href: '/communities', icon: UsersIcon },
    { label: 'Events', href: '/events', icon: CalendarIcon },
    { label: 'Reconquista', href: '/reconquista', icon: FlagIcon },
  ];

  return (
    <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-slate-900 px-4 py-3 shadow-lg">
      {/* Logo Section */}
      <Link
        href="/"
        aria-label="Go to homepage"
        className="flex items-center gap-2 transition-transform hover:scale-105"
      >
        <Image
          src="/assets/icons/ForeverFree_Logo.png"
          width={40}
          height={40}
          alt="ForeverFree Logo"
          className="drop-shadow-[0_0_2px_black]"
        />
        <span className="hidden text-2xl font-extrabold tracking-wide text-amber-400 transition-colors hover:text-amber-600 lg:block">
          Forever Free
        </span>
      </Link>

      {/* Nav Items */}
      <nav className="flex items-center gap-6">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2 text-white transition-colors hover:text-amber-400"
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
            <span className="hidden text-lg md:inline-block">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session ? (
          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="flex items-center gap-2 rounded border border-amber-600 bg-amber-700 px-3 py-1 text-white transition hover:bg-amber-600"
          >
            <span className="hidden lg:inline">Logout</span>
            <ArrowLeftOnRectangleIcon className="h-5 w-5 lg:hidden" />
          </Link>
        ) : (
          <Link
            href="/api/auth/signin"
            className="flex items-center gap-2 rounded border border-amber-600 bg-amber-700 px-3 py-1 text-white transition hover:bg-amber-600"
          >
            <span className="hidden lg:inline">Login</span>
            <ArrowRightOnRectangleIcon className="h-5 w-5 lg:hidden" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
