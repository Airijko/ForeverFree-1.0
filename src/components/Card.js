import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

const Card = async ({ organization }) => {
  return (
    <div className="transition-transform duration-300 hover:scale-105 max-w-md">
      <Link
        href={`/communities/${organization._id}`}
        className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 hover:shadow transition-shadow duration-300 hover:shadow-lg flex flex-col"
      >
        {/* Banner */}
        <div className="relative h-48 w-full bg-gray-200">
          {organization.bannerUrl && (
            <Image
              src={organization.bannerUrl}
              alt={`${organization.name} banner`}
              fill
              className="object-cover"
            />
          )}

          {/* Tag - Top Right */}
          <span className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-md select-none z-10">
            {organization.type}
          </span>
        </div>

        {/* Content Section */}
        <div className="flex flex-col px-4 pb-4 gap-3 relative">
          {/* Floating profile row */}
          {/* Floating profile row */}
          <div className="flex items-end gap-4 -mt-12">
            {/* Profile Image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-neutral-900 bg-gray-100 shrink-0">
              <Image
                src={organization.image || '/assets/icons/cross-logo.jpg'}
                alt={`${organization.name} logo`}
                fill
                className="object-cover"
              />
            </div>

            {/* Name & Location */}
            <div className="flex flex-col justify-end pb-1 text-gray-900 dark:text-white">
              <h1 className="text-2xl font-semibold truncate">
                {organization.name}
              </h1>
              <div className="mt-1 flex items-center text-sm text-gray-600 dark:text-gray-300 gap-1">
                <MapPinIcon className="w-4 h-4 shrink-0" />
                <p className="truncate">{organization.address}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-2">
            <div>
              <span className="font-medium">Language:</span> English, Spanish
            </div>
            <div>
              <span className="font-medium">Service:</span> Sundays @ 10:00 AM
            </div>
            <div>
              <span className="font-medium">Denomination:</span> Pentecostal
            </div>
          </div>

          {/* Bottom right icons */}
          <div className="flex justify-end space-x-4 mt-2">
            <button
              aria-label="Share"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              type="button"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
            <button
              aria-label="Like"
              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
              type="button"
            >
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
