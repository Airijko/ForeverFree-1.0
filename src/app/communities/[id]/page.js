// app/communities/[id]/page.js
import { fetchOrganization } from '@actions/organizationActions';

const Page = async ({ params }) => {
  const { id } = await params;
  const organization = await fetchOrganization(id);

  if (!organization) return <h1>Non-existent or spaghetti</h1>;
  if (organization.error) return <h1>{organization.error}</h1>;

  return (
    <section className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{organization.name}</h1>

      <div className="space-y-4">
        <p>
          <strong>Type:</strong> {organization.type}
        </p>
        <p>
          <strong>Address:</strong> {organization.address}
        </p>
        <p>
          <strong>Email:</strong> {organization.email}
        </p>
        <p>
          <strong>Phone:</strong> {organization.phone}
        </p>
        <p>
          <strong>Approved:</strong> {organization.isApproved ? 'Yes' : 'No'}
        </p>

        {organization.image && (
          <div>
            <strong>Image:</strong>
            <div className="mt-2">test image</div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Owner Info</h2>
          <p>
            <strong>Username:</strong> {organization.owner?.username}
          </p>
          <p>
            <strong>Email:</strong> {organization.owner?.email}
          </p>
          <p>
            <strong>Role:</strong> {organization.owner?.role}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
