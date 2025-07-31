'use client';

import { handleCommunitySearch } from '@actions/communityAction';
import { SubmitButton } from '@components/Buttons/SubmitButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const SearchForm = () => {
  const pathname = usePathname();
  const match = pathname?.match(/^\/communities\/([^/?#]+)/);
  const category = match?.[1] || 'all';

  const clientAction = async (formData) => {
    return handleCommunitySearch(formData);
  };

  return (
    <form action={clientAction} className="mx-auto mb-8 flex w-full max-w-2xl">
      <input type="hidden" name="category" value={category} />

      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </span>
        <input
          type="text"
          name="search"
          placeholder="Search communities..."
          className="w-full rounded-l-lg border border-zinc-200 bg-white py-3 pl-10 pr-4 text-base text-zinc-900 shadow-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />
      </div>
      <div className="flex max-w-[150px] flex-1 items-start">
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full rounded-r-lg border border-zinc-200 bg-white px-3 py-3 pr-4 text-base text-zinc-900 shadow-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />
      </div>
      <SubmitButton className="ml-2 flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-center text-white hover:bg-amber-500">
        Search
      </SubmitButton>
    </form>
  );
};

export default SearchForm;
