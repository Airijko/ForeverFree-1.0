import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';

const organizations = async ({ searchParams }) => {
  const { search = '' } = await searchParams;
  const communities = await fetchAllCommunities();

  const organizations = communities.filter(({ type, name }) => {
    return (
      type === 'organization' &&
      name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <FeedCommunities communities={organizations} />
    </div>
  );
};

export default organizations;
