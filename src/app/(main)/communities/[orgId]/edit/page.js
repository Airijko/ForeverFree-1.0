import {
  updateOrganization,
  fetchOrganization,
} from '@actions/communityAction';
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
      <div className="mx-auto mt-12 flex max-w-md flex-col items-center text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Authentication Required
        </h1>
        <p className="mb-4 text-gray-700">
          You must be logged in to edit organizations.
        </p>
        <Link
          href="/api/auth/signin"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
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
      <div className="mx-auto mt-12 flex max-w-md flex-col items-center text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mb-4 text-gray-700">
          You can only edit organizations that you own.
        </p>
        <Link
          href={`/communities/${orgId}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Back to Organization
        </Link>
      </div>
    );
  }

  const clientAction = async (data) => {
    'use server';
    const result = await updateOrganization(orgId, data);
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
