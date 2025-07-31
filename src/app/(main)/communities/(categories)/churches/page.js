import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';
import { matchesLocation } from '@utils/locationHelpers';

const churches = async ({ searchParams }) => {
  const { search = '', location = '' } = await searchParams;
  const communities = await fetchAllCommunities();

  const filtered = communities.filter((community) => {
    const matchesType = community.type === 'church';

    const matchesSearch = search
      ? community.name?.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesLoc = matchesLocation(community.location, location);

    return matchesType && matchesSearch && matchesLoc;
  });

  return <FeedCommunities communities={filtered} />;
};

export default churches;
