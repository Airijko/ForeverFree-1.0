'use client';

import { useState } from 'react';

const eventTypes = [
  'Worship',
  'Retreat',
  'Outreach',
  'Prayer',
  'Bible Study',
  'Social',
  'Fundraiser',
  'Conference',
  'Camp',
  'Other',
];

const CreateEventForm = ({ orgId, createEvent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log('CreateEventForm rendered with orgId:', orgId);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    formData.set('organization', orgId);

    try {
      await createEvent(formData);
      // Redirect handled by createEvent
    } catch (err) {
      setError('Failed to create event.');
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md
                 border border-gray-200 dark:border-gray-700"
    >
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Create New Event
      </h1>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">
          Title
        </span>
        <input
          name="title"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
          placeholder="Enter event title"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">
          Description
        </span>
        <textarea
          name="description"
          required
          rows={5}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
          placeholder="Describe your event"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">
          Event Type
        </span>
        <select
          name="eventType"
          defaultValue="Other"
          className="w-full rounded-md border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        >
          {eventTypes.map((et) => (
            <option key={et} value={et}>
              {et}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">
          Start Date
        </span>
        <input
          type="date"
          name="startDate"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">
          Location
        </span>
        <input
          name="location"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
          placeholder="Where will this event take place?"
        />
      </label>

      {/* Hidden organization id */}
      <input type="hidden" name="organization" value={orgId} />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                   text-white font-semibold rounded-md py-3 transition focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? 'Creating...' : 'Create Event'}
      </button>

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </form>
  );
};

export default CreateEventForm;
