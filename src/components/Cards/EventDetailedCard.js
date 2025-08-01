import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, ShareIcon } from '@heroicons/react/24/outline';

const EventDetailedCard = async ({ event }) => {
  const {
    _id,
    title,
    location,
    startDate,
    isFree,
    price,
    currency,
    community,
    image,
    eventType,
  } = event;

  const formattedMonth = startDate
    ? new Date(startDate)
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase()
    : 'TBD';

  const formattedDay = startDate ? new Date(startDate).getDate() : '';

  const eventLink = community?._id
    ? `/communities/${community._id}/events/${_id}`
    : '#';

  const displayImage = image || '/assets/images/eventsplaceholder.png';

  return (
    <Link
      href={eventLink}
      className="group flex w-full flex-row overflow-hidden rounded-xl bg-indigo-950 shadow-md transition-transform duration-300 dark:bg-zinc-900"
    >
      {/* Image */}
      <div className="relative h-auto w-full max-w-xs">
        <Image
          src={displayImage}
          alt={title}
          fill
          className="object-cover [mask-image:linear-gradient(to_left,transparent_0%,black_30%)]"
          sizes="(max-width: 768px) 100vw, 160px"
        />
        <span className="absolute left-1 top-1 z-10 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-black">
          {eventType || 'Event'}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between px-4 py-8">
        <div className="flex flex-row items-start justify-between gap-2 text-sm text-gray-400">
          <div className="flex flex-col gap-1">
            {/* Title */}
            <h2 className="line-clamp-2 text-4xl font-semibold text-white">
              {title}
            </h2>
            {/* Community */}
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-full bg-gray-300 dark:bg-neutral-700">
                <Image
                  src={community?.image || '/assets/icons/cross-logo.jpg'}
                  alt={community?.name || 'Community'}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="truncate text-sm font-medium text-gray-300">
                {community?.name || 'Unknown Org'}
              </span>
            </div>
          </div>
          {/* Date */}
          <div className="flex items-center gap-1">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md text-center">
              <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                {formattedMonth}
              </span>
              <span className="text-4xl font-bold leading-none text-white">
                {formattedDay}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Location + Share */}
        <div className="mt-3 flex items-center justify-between">
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-300">
            <MapPinIcon className="h-4 w-4" />
            <span className="truncate">
              {location?.street && location?.city && location?.province
                ? `${location.street}, ${location.city}, ${location.province}`
                : 'Location TBD'}
            </span>
          </div>

          <button
            aria-label="Share"
            className="text-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventDetailedCard;
