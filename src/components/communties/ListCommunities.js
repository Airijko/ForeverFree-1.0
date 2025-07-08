export const dynamic = 'force-dynamic';

import { mapOrganizations } from '@actions/organizationAction';
import Wrapper from '../Wrapper';

const getBreakpointColumnsObj = (maxColumns = 4) => {
  if (maxColumns === 1) return { default: 1 };
  if (maxColumns === 2) return { default: 2, 900: 1 };
  return { default: 3, 1800: 3, 1400: 2, 1000: 1 };
};

const ListCommunities = async ({ data, columns = 4 }) => {
  const organizations = await mapOrganizations(data);
  const breakpointColumnsObj = getBreakpointColumnsObj(columns);

  return (
    <section className="w-full">
      {/* Card List */}
      <Wrapper breakpointColumnsObj={breakpointColumnsObj}>
        {organizations}
      </Wrapper>
    </section>
  );
};

export default ListCommunities;
