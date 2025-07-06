export const dynamic = 'force-dynamic';

import { mapOrganizations } from '@actions/organizationActions';
import Link from 'next/link';
import WrapCommunities from './WrapCommunities';

const ListCommunities = async ({ data }) => {
  const organizations = await mapOrganizations(data);

  return (
    <section className="w-full max-w-5xl mx-auto py-8">
      {/* Card List */}
      <WrapCommunities>{organizations}</WrapCommunities>
    </section>
  );
};

export default ListCommunities;
