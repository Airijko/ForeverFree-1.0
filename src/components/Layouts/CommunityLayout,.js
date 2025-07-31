import SearchForm from '@components/Forms/SearchForm';
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const CommunityLayout = ({ children }) => {
  return (
    <section className="relative w-full">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/images/layered-steps-2.svg"
          alt="Header Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      {/* Main Content */}
      <section className="mainContent">
        <h1 className="my-8 mb-6 w-full text-center text-6xl font-bold text-white">
          <span className="block">Find Christian Communities</span>
        </h1>
        <SearchForm />

        <div className="grid grid-cols-4 gap-6">
          {/* ALL COMMUNITIES */}
          <Link
            href="/communities/all"
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <BuildingLibraryIcon className="h-16 w-16" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                All Communities
              </h3>
              <p className="mt-1 hidden text-sm text-zinc-600 dark:text-zinc-300 md:block">
                Explore all Christian communities and organizations.
              </p>
            </div>
          </Link>
          {/* Churches */}
          <Link
            href="/communities/churches"
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <BuildingLibraryIcon className="h-16 w-16" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                Churches
              </h3>
              <p className="mt-1 hidden text-sm text-zinc-600 dark:text-zinc-300 md:block">
                Find local churches and fellowships near you.
              </p>
            </div>
          </Link>
          {/* Schools */}
          <Link
            href="/communities/schools"
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <AcademicCapIcon className="h-16 w-16" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                Schools
              </h3>
              <p className="mt-1 hidden text-sm text-zinc-600 dark:text-zinc-300 md:block">
                Discover faith-based schools and learning centers.
              </p>
            </div>
          </Link>
          {/* Organizations */}
          <Link
            href="/communities/organizations"
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <BuildingOffice2Icon className="h-16 w-16" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                Organizations
              </h3>
              <p className="mt-1 hidden text-sm text-zinc-600 dark:text-zinc-300 md:block">
                Explore ministries, nonprofits, and outreach groups.
              </p>
            </div>
          </Link>
        </div>

        <main>{children}</main>
      </section>
    </section>
  );
};

export default CommunityLayout;
