import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

const CommunityCardPreview = ({ community }) => {
  const communityLink = community?._id ? `/communities/${community._id}` : '#';

  return (
    <div className="flex flex-1 overflow-hidden rounded-lg bg-indigo-950 shadow-2xl transition-all duration-300 hover:bg-indigo-900">
      <Link
        href={communityLink}
        className="flex w-full flex-col justify-between p-4 text-white"
      >
        {/* Title */}
        <h1 className="break-words text-2xl font-bold">{community.name}</h1>

        {/* Description */}
        <p className="my-2 break-words text-sm text-gray-200">
          {community.description}
        </p>

        {/* Bottom: Location and Type */}
        <div className="mt-auto flex flex-col justify-between gap-2 text-sm text-gray-300 lg:flex-row">
          <span className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4" />
            <span className="break-words">{community.location.street}</span>
          </span>
          <span className="rounded-md bg-blue-100 px-3 py-1 text-center text-xs font-semibold text-black">
            {community.type}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CommunityCardPreview;
