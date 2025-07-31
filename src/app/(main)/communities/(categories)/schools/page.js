import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';

const schools = async ({ searchParams }) => {
  const { search = '' } = await searchParams;
  const communities = await fetchAllCommunities();

  const schools = communities.filter(({ type, name }) => {
    return (
      type === 'school' && name?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <div>
      <FeedCommunities communities={schools} />
    </div>
  );
};

export default schools;
