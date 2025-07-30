import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';

const schools = async () => {
  const communities = await fetchAllCommunities();
  const schools = communities.filter(
    (community) => community.type === 'school'
  );
  return (
    <div>
      <FeedCommunities communities={schools} />
    </div>
  );
};

export default schools;
