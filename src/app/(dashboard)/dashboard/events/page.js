import { fetchAllEvents, deleteEvent } from '@actions/eventAction';

const Events = async () => {
  const events = await fetchAllEvents();

  if (events.error) {
    return (
      <div className="mx-auto mt-10 max-w-2xl p-6 text-center text-red-600">
        {events.error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Event Management
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Organization</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No events found.
              </td>
            </tr>
          )}
          {events.map((event) => (
            <tr
              key={event._id}
              className="border-b border-gray-200 dark:border-neutral-700"
            >
              <td className="p-2">{event.title}</td>
              <td className="p-2">
                {event.organization?.name || event.organization || 'N/A'}
              </td>
              <td className="p-2">
                {event.startDate
                  ? new Date(event.startDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td className="p-2">{event.eventType || 'Other'}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    'use server';
                    await deleteEvent(
                      event._id,
                      event.organization?._id || event.organization
                    );
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

export default Events;
