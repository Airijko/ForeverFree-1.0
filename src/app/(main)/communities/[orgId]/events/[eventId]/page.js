import { fetchEvent } from '@actions/eventAction';
import Image from 'next/image';

const ViewPostPage = async ({ params }) => {
  const { orgId, eventId } = params;
  console.log('orgId:', orgId, 'eventId:', eventId);

  // Fetch event linked to this org
  const event = await fetchEvent(eventId, orgId);

  if (event.error) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h1 className="mb-4 text-2xl font-semibold">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">{event.error}</p>
      </div>
    );
  }

  return (
    <article className="mainContent">
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
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

        <p className="mb-6 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
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
          <p className="mb-4 font-semibold text-green-600 dark:text-green-400">
            Free Event
          </p>
        ) : (
          <p className="mb-4 font-semibold text-red-600 dark:text-red-400">
            Price: {event.currency} {event.price.toFixed(2)}
          </p>
        )}

        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            Register Here
          </a>
        )}

        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            className="mt-6 max-h-96 w-full rounded-md object-cover"
          />
        )}
      </div>
    </article>
  );
};

export default ViewPostPage;
