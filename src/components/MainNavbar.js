import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';

const MainNavbar = async () => {
  const session = await getServerSession(options);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/icons/kingdomofheaven.png"
          width={30}
          height={30}
          alt="ForeverFree Logo"
        />
        <h1>Forever Free</h1>
      </Link>
      <div className="flex gap-10">
        <Link href="/" className="white_nav_btn">
          Home
        </Link>
        <Link href="/about" className="white_nav_btn">
          About
        </Link>
        <Link href="/communities" className="white_nav_btn">
          Communities
        </Link>
        <Link href="/admin" className="white_nav_btn">
          Admin
        </Link>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/" className="black_btn">
            Logout
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="black_btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
