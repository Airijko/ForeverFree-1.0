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
          <div className="ml-auto mb-6">
            <Link href="/communities/register" className="btn btn-outline">
              Register Organization
            </Link>
          </div>
        </div>
      </MainHeader>

      <div className="w-full max-w-5xl mx-auto py-8">
        <ListCommunities data={data} />
      </div>
    </section>
  );
};

export default Communities;
