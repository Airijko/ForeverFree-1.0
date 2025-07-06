import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import ThemeToggle from './ThemeToggle';

const MainNavbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center hover:backdrop-blur-md hover:shadow-md transition-all duration-300">
      <Link href="/" className="flex gap-4 items-center">
        <Image
          src="/assets/icons/kingdomofheaven.png"
          width={30}
          height={30}
          alt="ForeverFree Logo"
        />
        <h1 className="text-3xl font-bold text-primary dark:text-white">
          Forever Free
        </h1>
      </Link>

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex items-center gap-x-4">
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
