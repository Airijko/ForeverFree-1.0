export const dynamic = 'force-dynamic';

import { mapOrganizations } from '@actions/organizationActions';
import Wrapper from '../Wrapper';

const ListCommunities = async ({ data }) => {
  const organizations = await mapOrganizations(data);

  return (
    <section className="w-full">
      {/* Card List */}
      <Wrapper>{organizations}</Wrapper>
    </section>
  );
};

export default ListCommunities;
