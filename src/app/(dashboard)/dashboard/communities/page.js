import {
  fetchAllOrganizations,
  deleteOrganization,
} from '@actions/organizationAction';

const Communities = async () => {
  const organizations = await fetchAllOrganizations();

  if (organizations.error) {
    return (
      <div className="mx-auto mt-10 max-w-2xl p-6 text-center text-red-600">
        {organizations.error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Organization Management
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No organizations found.
              </td>
            </tr>
          )}
          {organizations.map((org) => (
            <tr
              key={org._id}
              className="border-b border-gray-200 dark:border-neutral-700"
            >
              <td className="p-2">{org.name}</td>
              <td className="p-2">{org.email || 'N/A'}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    'use server';
                    await deleteOrganization(org._id);
                  }}
                >
                  <button
                    type="submit"
                    className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Communities;
