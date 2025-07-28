'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  HeartIcon,
  HandRaisedIcon,
  ShieldCheckIcon,
  HomeIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import OrganizationCard from '@components/Cards/OrganizationCard';
import LocationInput from '@components/Inputs/LocationInput';

const subcategories = [
  {
    label: 'Spiritual Guidance & Counseling',
    value: 'guidance',
    icon: HeartIcon,
  },
  { label: 'Prayer & Intercession', value: 'prayer', icon: HandRaisedIcon },
  { label: 'Recovery & Restoration', value: 'recovery', icon: ShieldCheckIcon },
  { label: 'Community Outreach & Aid', value: 'outreach', icon: HomeIcon },
  {
    label: 'Evangelism & Discipleship',
    value: 'evangelism',
    icon: GlobeAltIcon,
  },
  { label: 'Youth & Family Ministries', value: 'youth', icon: UserGroupIcon },
];

const FeedCommunities = ({ organizations }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const updateSearchParams = ({
    search = searchParams.get('search') || '',
    type = searchParams.get('type') || '',
    country = searchParams.get('country') || '',
    region = searchParams.get('region') || '',
    city = searchParams.get('city') || '',
    tag = searchParams.get('tag') || '',
  }) => {
    const params = new URLSearchParams();

    if (search.trim()) params.set('search', search);
    if (type) params.set('type', type);
    if (country) params.set('country', country);
    if (region) params.set('region', region);
    if (city) params.set('city', city);
    if (tag) params.set('tag', tag);

    startTransition(() => {
      router.replace(`/communities?${params.toString()}`);
    });
  };

  const handleTypeClick = (type) => {
    updateSearchParams({ type });
  };

  const handleTagClick = (tag) => {
    updateSearchParams({ tag });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchParams({ search: value });
  };

  const handleLocationChange = (location) => {
    updateSearchParams({
      country: location.country,
      region: location.region,
      city: location.city,
    });
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mx-auto my-8 px-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search communities..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-3 pl-10 pr-4 text-base text-zinc-900 shadow-sm transition-transform focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-900"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <LocationInput
            showStreet={false}
            onLocationChange={handleLocationChange}
          />
        </div>
      </div>

      {/* Filter Cards */}
      <div className="mx-auto w-full px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Churches */}
          <button
            type="button"
            onClick={() => handleTypeClick('church')}
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <BuildingLibraryIcon className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                Churches
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Find local churches and fellowships near you.
              </p>
            </div>
          </button>

          {/* Schools */}
          <button
            type="button"
            onClick={() => handleTypeClick('school')}
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <AcademicCapIcon className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                Schools
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Discover faith-based schools and learning centers.
              </p>
            </div>
          </button>

          {/* Organizations */}
          <button
            type="button"
            onClick={() => handleTypeClick('organization')}
            className="card-gradient group flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
              <UsersIcon className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                Organizations
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Explore ministries, nonprofits, and outreach groups.
              </p>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.replace('/communities')}
          className="card-gradient group mt-6 flex w-full flex-col items-center justify-center gap-2 p-6"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
              All Communities
            </h3>
          </div>
        </button>
      </div>

      {/* <div className="mx-auto mt-4 w-full px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {subcategories.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleTagClick(value)}
              className="card-gradient group flex flex-row items-center justify-start gap-4 rounded-xl p-6"
            >
              <div className="rounded-full bg-amber-600 p-3 text-white transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-md text-start font-medium text-zinc-800 dark:text-white">
                {label}
              </h4>
            </button>
          ))}
        </div>
      </div>

      {isPending && (
        <p className="text-center text-sm text-amber-600">Loading...</p>
      )}

      <ul className="mx-auto my-4 flex flex-col gap-5 px-4">
        {organizations.map((org) => (
          <OrganizationCard key={org._id} organization={org} />
        ))}
      </ul> */}
    </div>
  );
};

export default FeedCommunities;
