// app/communities/[id]/page.js
import { fetchOrganization } from '@actions/organizationAction';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import OrganizationProfile from '@components/OrganizationProfile';

const Page = async ({ params }) => {
  const { orgId } = await params;
  const organization = await fetchOrganization(orgId);
  const session = await getServerSession(options);
  const userId = session?.user?.id;
  const isOwner = userId === organization?.owner?._id;

  if (!organization) {
    return (
      <h1 className="text-center py-20 text-xl">Organization Not Found</h1>
    );
  }
  if (organization.error) {
    return <h1 className="text-center py-20 text-xl">{organization.error}</h1>;
  }

  return (
    <OrganizationProfile
      formData={organization}
      isOwner={isOwner}
      isEditing={false}
    />
  );
};

export default Page;
