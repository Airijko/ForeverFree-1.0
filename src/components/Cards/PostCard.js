import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  ShareIcon,
  HeartIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const PostCard = async ({ post, index }) => {
  console.log('PostCard rendered for post:', post);
  const {
    _id,
    title,
    description,
    location,
    startDate,
    isFree,
    price,
    currency,
    imageUrl,
    organization,
  } = post;

  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'TBD';

  return (
    <div className="w-full hover:scale-105 shadow-md hover:shadow-xl overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 transition-all duration-300">
      <Link
        href={`/posts/${_id}`}
        className="p-2 relative w-full h-full flex flex-col"
      >
        {/* Content Section */}
        <div className="flex flex-row min-h-[8rem]">
          <div className="relative w-72 h-48 flex-shrink-0">
            {/* Event Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {/* Light mode image */}
              <Image
                src="/assets/images/light-cardbackground.svg"
                alt="Light background"
                fill
                className="object-cover block dark:hidden"
              />
              {/* Dark mode image */}
              <Image
                src="/assets/images/dark-cardbackground.svg"
                alt="Dark background"
                fill
                className="object-cover hidden dark:block"
              />
            </div>
            {/* Organization Profile Icon */}
            <div className="absolute bottom-2 left-2 w-16 h-16 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={
                  organization?.image && organization.image !== ''
                    ? organization.image
                    : '/assets/images/event-placeholder.jpg'
                }
                alt={organization?.name || 'Organization'}
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>

          {/* Post Info */}
          <div className="flex flex-col justify-between text-gray-900 dark:text-white w-full">
            {/* Tag - Top Right */}
            <span className="ml-auto my-1 mx-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-md select-none z-10">
              {post.eventType || 'Event'}
            </span>

            <div className="px-4">
              <h1 className="font-bold text-2xl break-words whitespace-normal">
                {title}
              </h1>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
                {description}
              </p>

              <div className="mt-2 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center text-sm text-gray-600 dark:text-gray-300 gap-1 min-w-0">
                <span className="flex items-center gap-1 min-w-0">
                  <CalendarDaysIcon className="w-4 h-4 shrink-0" />
                  <p>{formattedDate}</p>
                </span>
                <span className="flex items-center gap-1 min-w-0">
                  <MapPinIcon className="w-4 h-4 shrink-0" />
                  <p className="break-words whitespace-normal min-w-0">
                    {location || 'TBD'}
                  </p>
                </span>
                <span className="flex items-center gap-1 min-w-0">
                  <CurrencyDollarIcon className="w-4 h-4 shrink-0" />
                  <p>
                    {isFree || !price || price === 0
                      ? 'Free'
                      : `${currency} ${price}`}
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

export default PostCard;
