import SearchForm from '@components/Forms/SearchForm';

import { Building2, Church, GraduationCap, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CommunityLayout = ({ children }) => {
  return (
    <section className="relative mx-auto w-full max-w-7xl">
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
        <h1 className="my-8 w-full text-center text-6xl font-bold text-white">
          <span className="block">Find Christian Communities</span>
        </h1>
        <SearchForm />
        <div className="my-8">
          <h1 className="w-full text-center text-4xl font-semibold text-white">
            <span className="block">Browse by Category</span>
          </h1>
          <p className="w-full text-center text-lg text-zinc-300">
            Explore various types of Christian communities and organizations.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {/* ALL COMMUNITIES */}
          <Link
            href="/communities/all"
            className="card-gradient group flex w-full flex-col items-center justify-center gap-3 p-6 lg:aspect-square"
          >
            <div className="rounded-full text-indigo-600 transition-transform group-hover:scale-110">
              <Users className="h-16 w-16 lg:h-24 lg:w-24" />
            </div>
            <div className="hidden text-center md:block">
              <h3 className="text-2xl font-bold text-black">All Communities</h3>
              <p className="text-md mt-1 text-zinc-800">
                Explore all Christian communities and organizations.
              </p>
            </div>
          </Link>
          {/* Churches */}
          <Link
            href="/communities/churches"
            className="card-gradient group flex w-full flex-col items-center justify-center gap-3 p-6 xl:aspect-square"
          >
            <div className="rounded-full text-indigo-600 transition-transform group-hover:scale-110">
              <Church className="h-16 w-16 lg:h-24 lg:w-24" />
            </div>
            <div className="hidden text-center md:block">
              <h3 className="text-2xl font-bold text-black">Churches</h3>
              <p className="text-md mt-1 hidden text-zinc-800 md:block">
                Find local churches and fellowships near you.
              </p>
            </div>
          </Link>
          {/* Schools */}
          <Link
            href="/communities/schools"
            className="card-gradient group flex w-full flex-col items-center justify-center gap-3 p-6 xl:aspect-square"
          >
            <div className="rounded-full text-indigo-600 transition-transform group-hover:scale-110">
              <GraduationCap className="h-16 w-16 lg:h-24 lg:w-24" />
            </div>
            <div className="hidden text-center md:block">
              <h3 className="text-2xl font-bold text-black">Schools</h3>
              <p className="text-md mt-1 hidden text-zinc-800 md:block">
                Discover faith-based schools and learning centers.
              </p>
            </div>
          </Link>
          {/* Organizations */}
          <Link
            href="/communities/organizations"
            className="card-gradient group flex w-full flex-col items-center justify-center gap-3 p-6 xl:aspect-square"
          >
            <div className="rounded-full text-indigo-600 transition-transform group-hover:scale-110">
              <Building2 className="h-16 w-16 lg:h-24 lg:w-24" />
            </div>
            <div className="hidden text-center md:block">
              <h3 className="text-2xl font-bold text-black">Organizations</h3>
              <p className="text-md mt-1 hidden text-zinc-800 md:block">
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
