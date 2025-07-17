import { fetchEvent } from '@actions/eventAction';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  TagIcon,
  CurrencyDollarIcon,
  StarIcon,
  UserIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const ViewPostPage = async ({ params }) => {
  const { orgId, eventId } = params;
  const event = await fetchEvent(eventId, orgId);

  if (event.error) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h1 className="mb-4 text-2xl font-semibold">Event Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">{event.error}</p>
      </div>
    );
  }

  const {
    title,
    description,
    eventType,
    groupTarget,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    isFree,
    price,
    currency,
    registrationLink,
    image,
    tags,
    likes,
    organization,
    creator,
    isFeatured,
    createdAt,
  } = event;

  const dateRange =
    new Date(startDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) +
    (endDate
      ? ' - ' +
        new Date(endDate).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '');

  const timeRange = startTime
    ? `${startTime}${endTime ? ` - ${endTime}` : ''}`
    : null;

  const fullAddress = [
    location?.street,
    location?.city,
    location?.province,
    location?.country,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <article className="mainContent overflow-hidden rounded-xl bg-white shadow dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative h-72 w-full">
        <Image
          src={image || '/assets/images/eventsplaceholder.png'}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 left-4 z-10 text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          {isFeatured && (
            <div className="mt-2 inline-flex items-center gap-1 rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-white">
              <StarIcon className="h-4 w-4" />
              Featured
            </div>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="space-y-6 p-6 md:p-8">
        {/* Tags and Type */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-gray-700 dark:border-neutral-700 dark:text-gray-300">
            <TagIcon className="h-4 w-4" />
            {eventType}
          </span>
          <span className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-gray-700 dark:border-neutral-700 dark:text-gray-300">
            <UserGroupIcon className="h-4 w-4" />
            {groupTarget}
          </span>
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Time, Date, Location */}
        <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5" />
            <span>{dateRange}</span>
          </div>
          {timeRange && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>{timeRange}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span>{fullAddress}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-sm font-medium">
          {isFree ? (
            <p className="text-green-600 dark:text-green-400">Free Event</p>
          ) : (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <CurrencyDollarIcon className="h-5 w-5" />
              <span>
                {currency} {price.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Organizer Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            <span>
              Posted by{' '}
              <span className="font-medium">
                {creator?.name || 'Organizer'}
              </span>{' '}
              from{' '}
              <Link
                href={`/organizations/${organization?._id}`}
                className="text-blue-600 underline dark:text-blue-400"
              >
                {organization?.name || 'Organization'}
              </Link>
            </span>
          </div>
          <p className="mt-1 text-xs">
            Created on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <div className="prose dark:prose-invert max-w-none">
          <p>{description}</p>
        </div>

        {/* Registration Link */}
        {registrationLink && (
          <div>
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            >
              Register Now
            </a>
          </div>
        )}

        {/* Likes */}
        {likes?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <HeartIcon className="h-4 w-4 text-pink-500" />
            {likes.length} people liked this event
          </div>
        )}
      </div>
    </article>
  );
};

export default ViewPostPage;
