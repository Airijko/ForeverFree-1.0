'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import OrganizationCard from '@components/Cards/OrganizationCard';
import LocationInput from '@components/Inputs/LocationInput';

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
  }) => {
    const params = new URLSearchParams();

    if (search.trim()) params.set('search', search);
    if (type) params.set('type', type);
    if (country) params.set('country', country);
    if (region) params.set('region', region);
    if (city) params.set('city', city);

    startTransition(() => {
      router.replace(`/communities?${params.toString()}`);
    });
  };

  const handleTypeClick = (type) => {
    updateSearchParams({ type });
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
            className="w-full rounded-lg border border-zinc-200 bg-white py-3 pl-10 pr-4 text-base text-zinc-900 shadow-sm transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-900"
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
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => handleTypeClick('church')}
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:bg-amber-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-amber-900"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition group-hover:scale-110">
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

          <button
            type="button"
            onClick={() => handleTypeClick('school')}
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:bg-amber-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-amber-900"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition group-hover:scale-110">
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

          <button
            type="button"
            onClick={() => handleTypeClick('organization')}
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:bg-amber-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-amber-900"
          >
            <div className="rounded-full bg-amber-600 p-3 text-white transition group-hover:scale-110">
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
          className="group mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:bg-amber-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-amber-900"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
              All Communities
            </h3>
          </div>
        </button>
      </div>

      {isPending && (
        <p className="text-center text-sm text-amber-600">Loading...</p>
      )}

      <ul className="mx-auto my-4 flex flex-col gap-5 px-4">
        {organizations.map((org) => (
          <OrganizationCard key={org._id} organization={org} />
        ))}
      </ul>
    </div>
  );
};

export default FeedCommunities;
