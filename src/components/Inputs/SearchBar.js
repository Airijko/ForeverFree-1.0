import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  return (
    <form className="flex items-center w-full max-w-xl mx-auto bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
      <button
        type="submit"
        className="flex items-center justify-center pl-4 pr-2 text-gray-400 hover:text-blue-600 focus:outline-none"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
      <input
        type="text"
        placeholder="Search communities..."
        className="flex-1 bg-transparent outline-none px-2 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      />
    </form>
  );
};

export default SearchBar;
