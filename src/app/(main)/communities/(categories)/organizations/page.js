import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';

const organizations = async () => {
  const communities = await fetchAllCommunities();
  const organizations = communities.filter(
    (community) => community.type === 'organization'
  );
  return (
    <div>
      <FeedCommunities communities={organizations} />
    </div>
  );
};

export default organizations;
