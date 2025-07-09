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
    <div className="w-full hover:scale-105 shadow-md hover:shadow-xl overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 transition-all duration-300">
      <Link href={orgLink} className="p-2 relative w-full h-full flex flex-col">
        {/* Content Section */}
        <div className="flex flex-row min-h-[8rem]">
          {/* Profile Image - full height left */}
          <div className="relative w-32 aspect-square flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white dark:border-neutral-900 bg-gray-100">
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
          <div className="flex flex-col justify-between text-gray-900 dark:text-white w-full">
            {/* Tag - Top Right */}
            <span className="ml-auto my-1 mx-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-md select-none z-10">
              {organization.type}
            </span>
            <div className="px-4">
              <h1 className="font-bold organization_card_title text-2xl break-words whitespace-normal">
                {organization.name}
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center text-sm text-gray-600 dark:text-gray-300 gap-1 min-w-0">
                <span className="flex items-center gap-1 min-w-0">
                  <MapPinIcon className="w-4 h-4 shrink-0" />
                  <p className="break-words whitespace-normal min-w-0">
                    {organization.location.street}
                  </p>
                </span>
                <span className="flex items-center gap-1 min-w-0">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <p className="break-words whitespace-normal min-w-0">
                    {organization.phone}
                  </p>
                </span>
              </div>
            </div>
            {/* Bottom right icons */}
            <div className="flex justify-end space-x-4 mt-4">
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
        </div>
      </Link>
    </div>
  );
};

export default OrganizationCard;
