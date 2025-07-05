import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ShareIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    description,
    startDate,
    startTime,
    location,
    eventType,
    groupTarget,
    organization,
    image,
    tags = [],
  } = post;

  const formattedDate = new Date(startDate).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="border border-gray-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/communities/${organization?._id}`}
          className="flex items-center gap-3"
        >
          <Image
            src={organization?.image || '/assets/icons/cross-logo.jpg'}
            alt={`${organization?.name} logo`}
            width={36}
            height={36}
            className="rounded-full object-cover border border-gray-300 dark:border-neutral-700"
          />
          <div className="text-sm">
            <p className="font-semibold text-gray-800 dark:text-white">
              {organization?.name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              {eventType}
            </p>
          </div>
        </Link>
        <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md">
          {groupTarget}
        </span>
      </div>

      {/* Image (optional) */}
      {image && (
        <div className="relative h-48 w-full rounded-md overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col gap-1">
        <Link href={`/events/${_id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:underline">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Event Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {startTime && (
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{startTime}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>

      {/* Tags + Actions */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2 flex-wrap text-xs text-blue-600 dark:text-blue-400">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-blue-50 dark:bg-blue-900 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-gray-400 dark:text-gray-500">
          <button
            type="button"
            aria-label="Share"
            className="hover:text-blue-500"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Like"
            className="hover:text-red-500"
          >
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
