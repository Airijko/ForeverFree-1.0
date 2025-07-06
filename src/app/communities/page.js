import { fetchAllOrganizations } from '@actions/organizationActions';
import ListCommunities from '@components/communties/ListCommunities';
import MainHeader from '@components/MainHeader';

const Communities = async () => {
  const data = await fetchAllOrganizations();

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <MainHeader>
        <h1 className=" text-center text-6xl font-bold mb-8 dark:text-neutral-200">
          <span className="block">Christian</span>
          <span className="block">Communities</span>
        </h1>
      </MainHeader>

      <ListCommunities data={data} />
    </section>
  );
};

export default Communities;
