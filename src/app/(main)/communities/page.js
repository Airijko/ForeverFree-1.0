import { fetchAllOrganizations } from '@actions/organizationAction';
import ListCommunities from '@components/Communties/ListCommunities';
import SearchBar from '@components/Inputs/SearchBar';
import MainHeader from '@components/MainHeader';
import Link from 'next/link';

const Communities = async () => {
  const data = await fetchAllOrganizations();

  return (
    <section className="mainContent">
      <MainHeader>
        <div className="flex h-full w-full max-w-5xl flex-col items-center justify-end">
          <h1 className="head_text mb-8 w-full text-center text-6xl font-bold">
            <span className="block">Christian</span>
            <span className="block">Communities</span>
          </h1>
          {/* Search Bar */}
          <SearchBar></SearchBar>
          {/* Register Button */}
          <div className="mb-4 mt-1 flex w-full justify-end">
            <Link href="/communities/register">
              <button
                type="button"
                className="items-center justify-center rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300"
              >
                Register Community
              </button>
            </Link>
          </div>
        </div>
      </MainHeader>

      <div className="mx-auto py-8">
        <ListCommunities data={data} columns={3} />
      </div>
    </section>
  );
};

export default Communities;
