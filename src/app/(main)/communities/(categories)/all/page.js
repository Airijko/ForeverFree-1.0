import { fetchAllCommunities } from '@actions/communityAction';
import FeedCommunities from '@components/Communities/FeedCommunities';
import React from 'react';

const page = async () => {
  const communities = await fetchAllCommunities();
  return (
    <div>
      <FeedCommunities communities={communities} />
    </div>
  );
};

export default page;
