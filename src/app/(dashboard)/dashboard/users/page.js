import { fetchAllUsers, deleteUser, updateUser } from '@actions/userAction';

const Users = async () => {
  const users = await fetchAllUsers();

  if (users.error) {
    return (
      <div className="mx-auto mt-10 max-w-2xl p-6 text-center text-red-600">
        {users.error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        User Management
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 dark:border-neutral-700"
            >
              <td className="p-2 align-middle">{user.email}</td>
              <td className="p-2 align-middle">
                <form
                  action={async (formData) => {
                    'use server';
                    const newRole = formData.get('role');
                    await updateUser(user._id, { role: newRole });
                  }}
                  className="flex items-center gap-2"
                >
                  <select
                    name="role"
                    defaultValue={user.role}
                    className="rounded border px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
                  >
                    Update
                  </button>
                </form>
              </td>
              <td className="p-2 align-middle">
                <form
                  action={async () => {
                    'use server';
                    await deleteUser(user._id);
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

export default Users;
