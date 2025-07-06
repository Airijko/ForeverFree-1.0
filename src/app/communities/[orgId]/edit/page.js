import {
  updateOrganization,
  fetchOrganization,
} from '@actions/organizationActions';
import OrganizationProfile from '@components/OrganizationProfile';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import Link from 'next/link';

const EditPage = async ({ params }) => {
  const { orgId } = await params;
  const session = await getServerSession(options);
  const userId = session?.user?.id;

  // Redirect if user is not logged in
  if (!session || !userId) {
    return (
      <div className="mx-auto flex flex-col items-center mt-12 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Required
        </h1>
        <p className="text-gray-700 mb-4">
          You must be logged in to edit organizations.
        </p>
        <Link
          href="/api/auth/signin"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const data = await fetchOrganization(orgId);
  const isOwner = userId === data?.owner?._id;

  // Redirect if user is not the owner
  if (!isOwner) {
    return (
      <div className="mx-auto flex flex-col items-center mt-12 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-4">
          You can only edit organizations that you own.
        </p>
        <Link
          href={`/communities/${id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Back to Organization
        </Link>
      </div>
    );
  }

  const clientAction = async (data) => {
    'use server';
    const result = await updateOrganization(id, data);
    if (result && !result.error) {
      // Handle success - maybe redirect or show success message
      console.log('Success:', result);
    } else {
      console.error('Error:', result?.error);
    }
  };

  return (
    <form action={clientAction}>
      <OrganizationProfile formData={data} isOwner={isOwner} isEditing />
    </form>
  );
};

export default EditPage;
