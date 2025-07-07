import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import ThemeToggle from './ThemeToggle';

const MainNavbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav
      className="
      fixed top-0 left-0 w-full z-50 p-6
      flex justify-between items-center
      bg-transparent
      hover:bg-white/30 dark:hover:bg-neutral-900/30
      hover:backdrop-blur-md hover:shadow-md
      transition-all duration-300
    "
    >
      <Link
        href="/"
        className="flex gap-4 items-center group transition-all duration-200 ease-in-out hover:opacity-90 hover:scale-[1.02]"
        aria-label="Go to homepage"
      >
        <Image
          src="/assets/icons/ForeverFree_Logo.png"
          width={50}
          height={50}
          alt="ForeverFree Logo"
          className="transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_2px_black]"
        />

        <h1
          className="
      text-3xl font-extrabold
      text-gray-900 dark:text-gray-100
      drop-shadow-md
      select-none
      tracking-wide
      transition-colors duration-200
      group-hover:text-amber-600 dark:group-hover:text-amber-400
    "
        >
          Forever Free
        </h1>
      </Link>

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex items-center gap-x-4">
          {['Communities', 'Reconquista'].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase()}`}
              className="
                px-4 py-2 rounded-md
                text-gray-900 dark:text-gray-100
                font-semibold
                hover:bg-primary hover:text-white
                transition-colors duration-200
                cursor-pointer
                select-none
              "
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ThemeToggle wrapper with background & border */}
        <ThemeToggle />

        {session ? (
          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="
      flex items-center gap-2 ml-4
      px-4 py-2 rounded-xl
      bg-white/70 dark:bg-neutral-900/70
      text-gray-900 dark:text-gray-100
      font-semibold shadow
      backdrop-blur-md
      border border-gray-200 dark:border-neutral-800
      hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-neutral-900
      transition-all duration-200
      select-none
    "
          >
            Logout
          </Link>
        ) : (
          <Link
            href="/api/auth/signin"
            className="
      flex items-center gap-2 ml-4
      px-4 py-2 rounded-xl
      bg-white/70 dark:bg-neutral-900/70
      text-gray-900 dark:text-gray-100
      font-semibold shadow
      backdrop-blur-md
      border border-gray-200 dark:border-neutral-800
      hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-neutral-900
      transition-all duration-200
      select-none
    "
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
