import { fetchEvent } from '@actions/eventAction';
import Image from 'next/image';

const ViewPostPage = async ({ params }) => {
  const { orgId, eventId } = params;
  console.log('orgId:', orgId, 'eventId:', eventId);

  // Fetch event linked to this org
  const event = await fetchEvent(eventId, orgId);

  if (event.error) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">{event.error}</p>
      </div>
    );
  }

  return (
    <article className="mt-40 max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {event.title}
      </h1>

      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <strong>Event Type:</strong> {event.eventType}
      </p>

      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <strong>Target Group:</strong> {event.groupTarget}
      </p>

      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <strong>Date:</strong>{' '}
        {new Date(event.startDate).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {event.endDate
          ? ` - ${new Date(event.endDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}`
          : ''}
      </p>

      {event.startTime && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <strong>Time:</strong> {event.startTime}{' '}
          {event.endTime && `- ${event.endTime}`}
        </p>
      )}

      <p className="mb-6 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
        {event.description}
      </p>

      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <strong>Location:</strong>{' '}
        {event.location
          ? [
              event.location.street,
              event.location.city,
              event.location.state,
              event.location.country,
            ]
              .filter(Boolean)
              .join(', ')
          : ''}
      </p>

      {event.isFree ? (
        <p className="mb-4 text-green-600 dark:text-green-400 font-semibold">
          Free Event
        </p>
      ) : (
        <p className="mb-4 text-red-600 dark:text-red-400 font-semibold">
          Price: {event.currency} {event.price.toFixed(2)}
        </p>
      )}

      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Register Here
        </a>
      )}

      {event.image && (
        <Image
          src={event.image}
          alt={event.title}
          className="mt-6 rounded-md object-cover w-full max-h-96"
        />
      )}
    </article>
  );
};

export default ViewPostPage;
