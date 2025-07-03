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

  const handleProfileClick = () => {
    router.push(`/communities/${organization._id}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={organization.image || '/assets/icons/cross-logo.jpg'}
            alt="organization_image"
            height={40}
            width={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between items-start mt-5 min-h-32">
        <div className="flex flex-col gap-2">
          <p className="font-satoshi text-sm text-gray-700">
            {organization.name}
          </p>
          <p className="font-satoshi text-sm text-gray-700">
            {organization.address}
          </p>
        </div>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer self-end"
          onClick={() => handleTagClick && handleTagClick(organization.tag)}
        >
          {organization.type}
        </p>
      </div>
    </div>
  );
};

export default Card;
