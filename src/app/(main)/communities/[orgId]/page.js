// app/communities/[id]/page.js
import { fetchCommunity } from '@actions/communityAction';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import OrganizationProfile from '@components/OrganizationProfile';

const Page = async ({ params }) => {
  const { orgId } = await params;
  const community = await fetchCommunity(orgId);
  const session = await getServerSession(options);
  const userId = session?.user?.id;
  const isOwner = userId === community?.owner?._id;

  if (!community) {
    return (
      <h1 className="py-20 text-center text-xl">Organization Not Found</h1>
    );
  }
  if (community.error) {
    return <h1 className="py-20 text-center text-xl">{community.error}</h1>;
  }

  return (
    <OrganizationProfile
      formData={community}
      isOwner={isOwner}
      isEditing={false}
    />
  );
};

export default Page;
