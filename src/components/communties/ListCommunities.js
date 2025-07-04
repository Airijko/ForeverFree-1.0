export const dynamic = 'force-dynamic';

import { mapOrganizations } from '@actions/organizationActions';
import Link from 'next/link';
import WrapCommunities from './WrapCommunties';

const ListCommunities = async ({ data }) => {
  const organizations = await mapOrganizations(data);

  return (
    <section className="feed">
      {/* Register Button */}
      <div className="flex justify-end w-full mb-6">
        <Link href="/communities/register" className="btn btn-outline">
          Register Organization
        </Link>
      </div>

      {/* Card List */}
      <WrapCommunities>{organizations}</WrapCommunities>
    </section>
  );
};

export default ListCommunities;
