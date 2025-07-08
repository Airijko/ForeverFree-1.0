import React from 'react';

const EventFilterBar = () => {
  return (
    <aside className="w-[280px] h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Filter Events
      </h2>

      <div className="mb-6">
        <label
          className="block mb-1 font-medium text-gray-800 dark:text-gray-300"
          htmlFor="date"
        >
          Date Range
        </label>
        <input
          type="date"
          id="startDate"
          className="w-full mb-2 p-2 border rounded border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
        />
        <input
          type="date"
          id="endDate"
          className="w-full p-2 border rounded border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="mb-6">
        <label
          className="block mb-1 font-medium text-gray-800 dark:text-gray-300"
          htmlFor="eventType"
        >
          Event Type
        </label>
        <select
          id="eventType"
          className="w-full p-2 border rounded border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
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
          className="block mb-1 font-medium text-gray-800 dark:text-gray-300"
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
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Within 10 km
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white py-2 rounded transition">
        Apply Filters
      </button>
    </aside>
  );
};

export default EventFilterBar;
