import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';

const churches = async ({ searchParams }) => {
  const { search = '' } = await searchParams;
  const communities = await fetchAllCommunities();

  const churches = communities.filter(({ type, name }) => {
    return (
      type === 'church' && name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <FeedCommunities communities={churches} />;
};

export default churches;
