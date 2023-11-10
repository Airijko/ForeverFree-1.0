'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const Card = ({ organization, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  console.log(organization);

  const handleProfileClick = () => {
    console.log(organization);

    if (organization.owner._id === session?.user.id)
      return router.push('/profile');

    router.push(
      `/profile/${organization.creator._id}?name=${organization.owner.username}`
    );
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={organization.image}
            alt="organization_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satosh font-semibold text-gray-900">
              {organization.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {organization.address}
            </p>
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {organization.name}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {organization.address}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(organization.tag)}
      >
        {organization.isChurch ? 'Church' : 'Organization'}
      </p>

      {/* {session?.user.id === post.owner._id && pathName === '/organization' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Card;
