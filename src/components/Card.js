import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  ShareIcon,
  HeartIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const Card = async ({ organization, index }) => {
  return (
    <div className="transition-transform duration-300 hover:scale-105">
      <Link
        href={`/communities/${organization._id}`}
        className="relative w-full h-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 hover:shadow transition-shadow duration-300 hover:shadow-lg flex flex-col"
      >
        <span className="absolute top-2 left-2 z-20 bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded shadow">
          #{index}
        </span>

        {/* Banner */}
        <div className="relative h-48 w-full bg-gray-200">
          {organization.bannerUrl ? (
            <Image
              src={organization.bannerUrl}
              alt={`${organization.name} banner`}
              fill
              className="object-cover"
            />
          ) : (
            <>
              {/* Light Theme Fallback */}
              <Image
                src="/assets/images/light-cardbackground.svg"
                alt="Default banner light"
                fill
                className="object-cover dark:hidden"
              />
              {/* Dark Theme Fallback */}
              <Image
                src="/assets/images/dark-cardbackground.svg"
                alt="Default banner dark"
                fill
                className="object-cover hidden dark:block"
              />
            </>
          )}

          {/* Tag - Top Right */}
          <span className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-md select-none z-10">
            {organization.type}
          </span>
        </div>

        {/* Content Section */}
        <div className="flex flex-col px-4 pb-4 gap-3 relative h-full">
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
            <div className="flex flex-col justify-end pb-3 text-gray-900 dark:text-white w-full">
              <h1 className="text-2xl font-semibold truncate">
                {organization.name}
              </h1>
              <div className="mt-1 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 gap-1">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4 shrink-0" />
                  <p className="truncate">{organization.address}</p>
                </span>
                <span className="flex items-center gap-1">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <p className="truncate">{organization.phone}</p>
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-3">
            <div>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Language:
              </span>{' '}
              {organization.language || 'English'}
            </div>

            {organization.type === 'church' && (
              <div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    Denomination:
                  </span>{' '}
                  {organization.denomination || 'Non-Denominational'}
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Service Times:
                </span>
                {organization.services?.length > 0 ? (
                  <ul className="mt-1 pl-4 list-disc text-gray-700 dark:text-gray-300">
                    {organization.services.flatMap((service) =>
                      service.times?.map((time, index) => (
                        <li key={time._id || `${service.description}-${index}`}>
                          <span className="font-medium">{time.day}</span> @{' '}
                          <span className="italic">{time.time}</span> —{' '}
                          {service.description}
                        </li>
                      ))
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic mt-1">
                    No services listed
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom right icons */}
          <div className="flex justify-end space-x-4 mt-auto">
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
