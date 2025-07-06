'use client';

import { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const LocationInput = ({ formData = {}, isEditing = false }) => {
  const location = formData.location || {};

  const [country, setCountry] = useState(isEditing ? location.country : '');
  const [region, setRegion] = useState(isEditing ? location.province : '');
  const [city, setCity] = useState(isEditing ? location.city : '');

  return (
    <div className="space-y-4">
      {/* Country */}
      <div className="w-full">
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Country
          </span>
          <CountryDropdown
            value={country}
            onChange={(val) => {
              setCountry(val);
              setRegion('');
            }}
            className="form_dropdown"
            name="country"
          />
        </label>
      </div>

      {/* Province / State */}
      <div className="w-full">
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Province / State
          </span>
          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
            className="form_dropdown"
            name="province"
          />
        </label>
      </div>

      {/* City (manual input since package doesn't handle cities) */}
      <div className="w-full">
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            City
          </span>
          <input
            type="text"
            name="city"
            className="form_input"
            placeholder="Enter city"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
      </div>

      {/* Street Address */}
      <div className="w-full">
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Street Address
          </span>
          <input
            name="street"
            type="text"
            placeholder="123 Main St"
            className="form_input"
            required
            defaultValue={isEditing ? formData.location?.street : ''}
          />
        </label>
      </div>
    </div>
  );
};

export default LocationInput;
