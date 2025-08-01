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
    eventType,
  } = event;

  const formattedMonth = startDate
    ? new Date(startDate)
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase()
    : 'TBD';

  const formattedDay = startDate ? new Date(startDate).getDate() : '';

  const formattedLocation =
    location?.street && location?.city && location?.province
      ? `${location.street}, ${location.city}, ${location.province}`
      : 'Location TBD';

  const formattedPrice =
    isFree || !price || price === 0 ? 'Free' : `${currency} ${price}`;

  const eventLink = community?._id
    ? `/communities/${community._id}/events/${_id}`
    : '#';

  return (
    <div className="overflow-hidden">
      <Link href={eventLink} className="block w-full">
        {/* Event Banner Image */}
        <div className="relative min-h-64 w-full">
          <Image
            src="/assets/images/landscape.png"
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="flex gap-4 py-4">
          {/* Date */}
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-amber-600 text-center">
            <span className="text-sm text-neutral-300">{formattedMonth}</span>
            <span className="text-3xl font-bold text-white">
              {formattedDay}
            </span>
          </div>

          {/* Main Info */}
          <div className="flex flex-1 flex-col gap-1 overflow-hidden">
            <span className="text-md text-gray-500">
              {/* start time */}
              <time dateTime={startDate}>
                {new Date(startDate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </time>
              <span className="mx-1.5">–</span>
              {/* end time */}
              <time dateTime={startDate}>
                {new Date(startDate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </time>
            </span>
            {/* Title */}
            <h2 className="text-2xl font-semibold text-neutral-700">{title}</h2>
          </div>

          {/* Right-side Actions */}
          <div className="flex flex-col items-end justify-between gap-2">
            <span className="rounded-md bg-green-800 px-3 py-1 text-xs font-semibold text-green-300">
              {eventType || 'Event'}
            </span>
            <div className="flex items-center gap-2">
              <button
                aria-label="Share"
                className="text-neutral-700 transition hover:text-blue-500"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="Like"
                className="text-neutral-700 transition hover:text-red-400"
              >
                <HeartIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
