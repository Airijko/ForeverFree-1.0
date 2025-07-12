import React from 'react';

const EventFilterBar = () => {
  return (
    <aside className="w-[280px] overflow-y-auto p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Filter Events
      </h2>

      <div className="mb-6">
        <label
          className="mb-1 block font-medium text-gray-800 dark:text-gray-300"
          htmlFor="date"
        >
          Date Range
        </label>
        <input
          type="date"
          id="startDate"
          className="mb-2 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
        />
        <input
          type="date"
          id="endDate"
          className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
        />
      </div>

      <div className="mb-6">
        <label
          className="mb-1 block font-medium text-gray-800 dark:text-gray-300"
          htmlFor="eventType"
        >
          Event Type
        </label>
        <select
          id="eventType"
          className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
        >
          <option>All</option>
          <option>Worship Service</option>
          <option>Bible Study</option>
          <option>Prayer Meeting</option>
          <option>Outreach</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          className="mb-1 block font-medium text-gray-800 dark:text-gray-300"
          htmlFor="radius"
        >
          Radius (km)
        </label>
        <input
          type="range"
          id="radius"
          min="1"
          max="100"
          defaultValue="10"
          className="w-full"
        />
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Within 10 km
        </div>
      </div>

      <button className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
        Apply Filters
      </button>
    </aside>
  );
};

export default EventFilterBar;
