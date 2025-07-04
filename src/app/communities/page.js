import { fetchAllOrganizations } from '@actions/organizationActions';
import ListCommunities from '@components/communties/ListCommunities';

const Communities = async () => {
  const data = await fetchAllOrganizations();

  return (
    <section className="w-full flex flex-col items-center justify-center py-12 px-4">
      <h1 className="head_text text-center mb-8">Christian Communities</h1>
      <ListCommunities data={data} />
    </section>
  );
};

export default Communities;
