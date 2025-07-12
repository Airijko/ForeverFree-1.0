import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  ShareIcon,
  HeartIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const OrganizationCard = async ({ organization, index }) => {
  const orgLink = organization?._id ? `/communities/${organization._id}` : '#';

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
      <Link href={orgLink} className="relative flex h-full w-full flex-col p-2">
        {/* Content Section */}
        <div className="flex min-h-[8rem] flex-row">
          {/* Profile Image - full height left */}
          <div className="relative aspect-square w-32 flex-shrink-0">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border-4 border-white bg-gray-100 dark:border-neutral-900">
              <Image
                src={organization.image || '/assets/icons/cross-logo.jpg'}
                alt={`${organization.name} logo`}
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>

          {/* Name & Location */}
          <div className="flex w-full flex-col justify-between text-gray-900 dark:text-white">
            {/* Tag - Top Right */}
            <span className="z-10 mx-1 my-1 ml-auto select-none rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {organization.type}
            </span>
            <div className="px-4">
              <h1 className="organization_card_title whitespace-normal break-words text-2xl font-bold">
                {organization.name}
              </h1>
              <div className="mt-1 flex min-w-0 flex-col flex-wrap items-start justify-between gap-1 text-sm text-gray-600 dark:text-gray-300 sm:flex-row sm:items-center">
                <span className="flex min-w-0 items-center gap-1">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  <p className="min-w-0 whitespace-normal break-words">
                    {organization.location.street}
                  </p>
                </span>
                <span className="flex min-w-0 items-center gap-1">
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  <p className="min-w-0 whitespace-normal break-words">
                    {organization.phone}
                  </p>
                </span>
              </div>
            </div>
            {/* Bottom right icons */}
            <div className="mt-4 flex justify-end space-x-4">
              <button
                aria-label="Share"
                className="text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
                type="button"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="Like"
                className="text-gray-400 transition hover:text-red-500 dark:hover:text-red-400"
                type="button"
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

export default OrganizationCard;
