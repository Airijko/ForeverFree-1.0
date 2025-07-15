import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  ShareIcon,
  HeartIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const EventDetailedCard = async ({ event }) => {
  const {
    _id,
    title,
    location,
    startDate,
    isFree,
    price,
    currency,
    organization,
    image,
    eventType,
  } = event;

  const formattedMonth = startDate
    ? new Date(startDate)
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase()
    : 'TBD';

  const formattedDay = startDate ? new Date(startDate).getDate() : '';

  const eventLink = organization?._id
    ? `/communities/${organization._id}/events/${_id}`
    : '#';

  const displayImage = image || '/assets/images/eventsplaceholder.png';

  return (
    <Link
      href={eventLink}
      className="group flex w-full flex-row overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] dark:border-neutral-700 dark:bg-neutral-800"
    >
      {/* Image */}
      <div className="relative h-auto w-48 min-w-48">
        <Image
          src={displayImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 160px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between px-4 py-3">
        {/* Date + Badge */}
        <div className="flex flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
          {/* Date */}
          <div className="flex items-center gap-1">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md text-center">
              <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                {formattedMonth}
              </span>
              <span className="text-4xl font-bold leading-none text-gray-800 dark:text-white">
                {formattedDay}
              </span>
            </div>
            {/* Title */}
            <h2 className="line-clamp-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <span className="mb-auto ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-800 dark:text-blue-300">
            {eventType || 'Event'}
          </span>
        </div>

        {/* Location */}
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <MapPinIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <span className="truncate">
            {location?.street && location?.city && location?.province
              ? `${location.street}, ${location.city}, ${location.province}`
              : 'Location TBD'}
          </span>
        </div>

        {/* Footer: Org + Share */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full bg-gray-300 dark:bg-neutral-700">
              <Image
                src={organization?.image || '/assets/icons/cross-logo.jpg'}
                alt={organization?.name || 'Organization'}
                fill
                className="object-cover"
              />
            </div>
            <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
              {organization?.name || 'Unknown Org'}
            </span>
          </div>

          <button
            aria-label="Share"
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventDetailedCard;
