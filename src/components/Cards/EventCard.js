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
    organization,
  } = event;

  const formattedMonth = startDate
    ? new Date(startDate)
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase()
    : 'TBD';

  const formattedDay = startDate ? new Date(startDate).getDate() : '';

  const eventLink = organization?._id
    ? `communities/${organization._id}/events/${_id}`
    : '#';

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 hover:scale-[1.02] hover:shadow-md transition-all duration-300">
      <Link
        href={eventLink}
        className="flex items-center justify-between p-4 w-full"
      >
        {/* Date */}
        <div className="w-16 h-16 flex flex-col items-center justify-center text-center rounded-md shrink-0 mr-2">
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
            {formattedMonth}
          </span>
          <span className="text-4xl font-bold text-gray-800 dark:text-white leading-none">
            {formattedDay}
          </span>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-center gap-2 mr-auto">
                {/* Org Icon */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-neutral-800 bg-gray-200 dark:bg-neutral-700 shrink-0">
                  <Image
                    src={
                      organization?.image ||
                      '/assets/images/event-placeholder.jpg'
                    }
                    alt={organization?.name || 'Organization'}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h2 className="font-semibold text-gray-900 dark:text-white text-4xl truncate">
                  {title}
                </h2>
              </div>

              {/* Sub-info */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mr-auto">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <p className="truncate">
                    {location?.street && location?.city && location?.province
                      ? `${location.street}, ${location.city}, ${location.province}`
                      : 'TBD'}
                  </p>
                </span>

                <span className="flex items-center gap-1">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <p>
                    {isFree || !price || price === 0
                      ? 'Free'
                      : `${currency} ${price}`}
                  </p>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col items-center justify-between gap-3 h-full">
              <span className="ml-auto my-1 mx-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-md select-none z-10">
                {event.eventType || 'Event'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Share"
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
                  type="button"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
                <button
                  aria-label="Like"
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition"
                  type="button"
                >
                  <HeartIcon className="w-5 h-5" />
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
