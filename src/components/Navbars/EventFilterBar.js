'use client';

import React, { useState } from 'react';

const EventFilterBar = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="w-full rounded-lg p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Filter Events
      </h2>

      {/* Important Filters: Location */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            type="text"
            placeholder="e.g. Winnipeg"
            className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Province
          </label>
          <input
            type="text"
            placeholder="e.g. Manitoba"
            className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
          </label>
          <input
            type="text"
            placeholder="e.g. Canada"
            className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Toggleable Filters */}
      {showMoreFilters && (
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Type
            </label>
            <select className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100">
              <option>All</option>
              <option>Worship</option>
              <option>Retreat</option>
              <option>Outreach</option>
              <option>Prayer</option>
              <option>Bible Study</option>
              <option>Social</option>
              <option>Fundraiser</option>
              <option>Conference</option>
              <option>Camp</option>
              <option>Other</option>
            </select>
          </div>

          {/* Group Target */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Group Target
            </label>
            <select className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100">
              <option>All Ages</option>
              <option>Kids</option>
              <option>Youth</option>
              <option>Young Adults</option>
              <option>Adults</option>
              <option>Seniors</option>
            </select>
          </div>

          {/* Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Radius (km)
            </label>
            <input
              type="range"
              min="1"
              max="100"
              defaultValue="10"
              className="w-full"
            />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Within 10 km
            </div>
          </div>
        </div>
      )}

      {/* Toggle + Submit Buttons */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <button
          type="button"
          onClick={() => setShowMoreFilters((prev) => !prev)}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {showMoreFilters ? 'Hide Filters' : 'More Filters'}
        </button>

        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default EventFilterBar;
