import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

const CommunityCard = ({ community }) => {
  const communityLink = community?._id ? `/communities/${community._id}` : '#';

  return (
    <div className="card-gradient w-full overflow-hidden transition-all duration-300">
      <Link
        href={communityLink}
        className="relative flex h-full w-full flex-col p-2"
      >
        {/* Content Section */}
        <div className="flex min-h-[8rem] flex-row">
          {/* Profile Image - full height left */}
          <div className="relative aspect-square w-32 flex-shrink-0">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border-4 border-white bg-gray-100 dark:border-neutral-900">
              <Image
                src={community.image || '/assets/icons/cross-logo.jpg'}
                alt={`${community.name} logo`}
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>

          {/* Name & Location */}
          <div className="relative flex w-full flex-col justify-between py-7 text-gray-900 dark:text-white">
            {/* Tag - Top Right */}
            <span className="absolute right-1 top-1 z-10 ml-auto select-none rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {community.type}
            </span>
            <div className="my-auto px-2">
              <h1 className="community_card_title whitespace-normal break-words text-2xl font-bold">
                {community.name}
              </h1>
              <div className="mt-1 flex min-w-0 flex-col flex-wrap items-start justify-between gap-1 text-sm text-gray-600 dark:text-gray-300 sm:flex-row sm:items-center">
                <span className="flex min-w-0 items-center gap-1">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  <p className="min-w-0 whitespace-normal break-words">
                    {community.location.street}
                  </p>
                </span>
              </div>
            </div>
            {/* Bottom right icons */}
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
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

export default CommunityCard;
