import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  ShareIcon,
  HeartIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const EventCard = async ({ event }) => {
  const {
    _id,
    title,
    location,
    startDate,
    isFree,
    price,
    currency,
    community,
  } = event;

  const formattedMonth = startDate
    ? new Date(startDate)
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase()
    : 'TBD';

  const formattedDay = startDate ? new Date(startDate).getDate() : '';

  const eventLink = community?._id
    ? `communities/${community._id}/events/${_id}`
    : '#';

  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
      <Link
        href={eventLink}
        className="flex w-full items-center justify-between p-4"
      >
        {/* Date */}
        <div className="mr-2 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md text-center">
          <span className="text-lg font-medium text-gray-400">
            {formattedMonth}
          </span>
          <span className="text-4xl font-bold leading-none text-white">
            {formattedDay}
          </span>
        </div>

        {/* Main content */}
        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <div className="mr-auto flex items-center justify-center gap-2">
                {/* Org Icon */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-neutral-800 bg-neutral-700">
                  <Image
                    src={
                      community?.image || '/assets/images/eventsplaceholder.png'
                    }
                    alt={community?.name || 'community'}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h2 className="truncate text-4xl font-semibold text-white">
                  {title}
                </h2>
              </div>

              {/* Sub-info */}
              <div className="mr-auto flex items-center gap-2 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <p className="truncate">
                    {location?.street && location?.city && location?.province
                      ? `${location.street}, ${location.city}, ${location.province}`
                      : 'TBD'}
                  </p>
                </span>

                <span className="flex items-center gap-1">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <p>
                    {isFree || !price || price === 0
                      ? 'Free'
                      : `${currency} ${price}`}
                  </p>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex h-full flex-col items-center justify-between gap-3">
              <span className="z-10 mx-1 my-1 ml-auto select-none rounded-md bg-green-800 px-3 py-1 text-xs font-semibold text-green-300">
                {event.eventType || 'Event'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Share"
                  className="text-gray-500 transition hover:text-gray-300"
                  type="button"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button
                  aria-label="Like"
                  className="text-gray-500 transition hover:text-red-400"
                  type="button"
                >
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
