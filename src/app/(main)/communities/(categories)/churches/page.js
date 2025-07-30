import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';
import React from 'react';

const churches = async () => {
  const communities = await fetchAllCommunities();
  const churches = communities.filter(
    (community) => community.type === 'church'
  );
  return (
    <div>
      <FeedCommunities communities={churches} />
    </div>
  );
};

export default churches;
