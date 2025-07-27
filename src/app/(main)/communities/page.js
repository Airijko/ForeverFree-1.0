import { fetchAllOrganizations } from '@actions/organizationAction';
import FeedCommunities from '@components/Communities/FeedCommunities';
import MainHeader from '@components/MainHeader';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Communities = async ({ searchParams }) => {
  const { search, type, country, region, city, tag } = await searchParams;
  const organizations = await fetchAllOrganizations(
    search,
    type,
    country,
    region,
    city,
    tag
  );
  const recentCommunities = organizations.reverse();

  return (
    <>
      <section className="mainContent">
        <MainHeader>
          <div className="flex h-full w-full flex-col items-center justify-end">
            <h1 className="head_text mb-8 w-full text-center text-6xl font-bold">
              <span className="block">Christian</span>
              <span className="block">Communities</span>
            </h1>
          </div>
        </MainHeader>

        {/* Main Content */}
        <main>
          <FeedCommunities organizations={recentCommunities} />
          <div className="sticky bottom-0 z-20 w-full bg-inherit py-4">
            <div className="mx-auto w-full max-w-2xl px-4">
              <Link href="/communities/register">
                <button
                  type="button"
                  className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-amber-600 px-6 py-4 text-2xl font-bold text-white shadow-lg transition-all duration-200 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-[80%] before:bg-white/20 before:blur-sm before:content-[''] hover:bg-amber-700 hover:before:animate-shine focus:outline-none focus:ring-4 focus:ring-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600 dark:focus:ring-amber-400"
                >
                  <PlusCircleIcon className="h-10 w-10 text-white" />
                  Register Community
                </button>
              </Link>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Communities;
