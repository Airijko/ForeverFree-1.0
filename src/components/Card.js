import Image from 'next/image';
import Link from 'next/link';

const Card = async ({ organization }) => {
  return (
    <div className="transition-transform duration-300 hover:scale-105">
      <Link
        href={`/communities/${organization._id}`}
        className="flex w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 hover:shadow transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Image Section */}
        <div className="relative w-40 aspect-square flex-shrink-0">
          <Image
            src={organization.image || '/assets/icons/cross-logo.jpg'}
            alt={`${organization.name} image`}
            fill
            className="object-cover transition-transform duration-300"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-between p-4 flex-grow">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {organization.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
              {organization.address}
            </p>
          </div>
          <div className="mt-3 ml-auto">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer">
              {organization.type}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
