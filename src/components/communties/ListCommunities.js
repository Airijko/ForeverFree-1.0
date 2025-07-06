export const dynamic = 'force-dynamic';

import { mapOrganizations } from '@actions/organizationActions';
import Link from 'next/link';
import WrapCommunities from './WrapCommunities';

const ListCommunities = async ({ data }) => {
  const organizations = await mapOrganizations(data);

  return (
    <section className="w-full">
      {/* Card List */}
      <WrapCommunities>{organizations}</WrapCommunities>
    </section>
  );
};

export default ListCommunities;
