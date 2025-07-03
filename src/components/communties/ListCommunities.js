export const dynamic = 'force-dynamic';

import {
  fetchAllOrganizations,
  mapOrganizations,
} from '@actions/organizationActions';
import Link from 'next/link';

const ListCommunities = async () => {
  const data = await fetchAllOrganizations();
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
      <section className="organization_layout">
        {organizations && organizations.length > 0 ? (
          organizations
        ) : (
          <p className="text-center text-gray-500">
            No communities found. Please check back later.
          </p>
        )}
      </section>
    </section>
  );
};

export default ListCommunities;
