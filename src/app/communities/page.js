import { fetchAllOrganizations } from '@actions/organizationActions';
import ListCommunities from '@components/communties/ListCommunities';
import SearchBar from '@components/Inputs/SearchBar';
import MainHeader from '@components/MainHeader';
import Link from 'next/link';

const Communities = async () => {
  const data = await fetchAllOrganizations();

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <MainHeader>
        <div className="flex flex-col items-center justify-end h-full w-full max-w-5xl">
          <h1 className="head_text w-full text-center text-6xl font-bold mb-8">
            <span className="block">Christian</span>
            <span className="block">Communities</span>
          </h1>
          {/* Search Bar */}
          <SearchBar></SearchBar>
          {/* Register Button */}
          <div className="w-full flex justify-end mt-1 mb-4">
            <Link href="/communities/register">
              <button
                type="button"
                className="items-center justify-center px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300 transition-all duration-200"
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
