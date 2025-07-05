import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import ThemeToggle from './ThemeToggle';

const MainNavbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className="flex-between items-center w-full py-3 px-6 bg-white dark:bg-black shadow-sm dark:shadow-md transition-colors duration-300">
      <Link href="/" className="flex gap-4 flex-wrap items-center">
        <Image
          src="/assets/icons/kingdomofheaven.png"
          width={30}
          height={30}
          alt="ForeverFree Logo"
        />
        <h1 className="text-xl font-bold text-primary dark:text-white">
          Forever Free
        </h1>
      </Link>
      <div className="flex flex-wrap items-center gap-x-4">
        <Link href="/" className="btn-glow">
          Home
        </Link>
        <Link href="/communities" className="btn-glow">
          Communities
        </Link>
        <Link href="/reconquista" className="btn-glow">
          Reconquista
        </Link>
        <Link href="/admin" className="btn-glow">
          Admin
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-x-4">
        <ThemeToggle />

        {session ? (
          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="btn btn-primary"
          >
            Logout
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
