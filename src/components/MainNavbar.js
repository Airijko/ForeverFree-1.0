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
      <Link href="/" className="flex gap-4 items-center">
        <Image
          src="/assets/icons/kingdomofheaven.png"
          width={30}
          height={30}
          alt="ForeverFree Logo"
        />
        <h1
          className="
          text-3xl font-extrabold
          text-gray-900 dark:text-gray-100
          drop-shadow-md
          select-none
          tracking-wide
        "
        >
          Forever Free
        </h1>
      </Link>

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex items-center gap-x-4">
          {['Home', 'Communities', 'Reconquista', 'Admin'].map((label) => (
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
              btn btn-primary ml-4
              select-none
            "
          >
            Logout
          </Link>
        ) : (
          <Link
            href="/api/auth/signin"
            className="
              btn btn-primary ml-4
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
