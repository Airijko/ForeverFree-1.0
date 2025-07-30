import { fetchAllCommunities } from '@actions/communityAction';
import React from 'react';

const page = async () => {
  const organizations = await fetchAllCommunities();
  return <div className="w-full bg-red-500 text-white">placeholder test</div>;
};

export default page;
