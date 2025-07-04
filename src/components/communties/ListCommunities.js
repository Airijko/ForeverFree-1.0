export const dynamic = 'force-dynamic';

import { mapOrganizations } from '@actions/organizationActions';
import Link from 'next/link';

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
      <section className="grid w-full gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {organizations && organizations.length > 0 ? (
          organizations
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No communities found. Please check back later.
          </p>
        )}
      </section>
    </section>
  );
};

export default ListCommunities;
