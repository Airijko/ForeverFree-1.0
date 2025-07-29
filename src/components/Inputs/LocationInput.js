'use client';
import { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const LocationInput = ({
  formData = {},
  onLocationChange,
  isEditing = false,
  showStreet = true,
}) => {
  const location = formData.location || {};

  const [country, setCountry] = useState(isEditing ? location.country : '');
  const [region, setRegion] = useState(isEditing ? location.province : '');
  const [city, setCity] = useState(isEditing ? location.city : '');
  const [street, setStreet] = useState(isEditing ? location.street : '');

  // Emit location change to parent
  useEffect(() => {
    onLocationChange?.({ country, region, city, street });
  }, [country, region, city, street]);

  return (
    <>
      <div className="flex flex-1 flex-wrap gap-4">
        <div className="min-w-[150px] flex-1">
          <label className="flex flex-col">
            <CountryDropdown
              value={country}
              onChange={(val) => {
                setCountry(val);
                setRegion('');
              }}
              className="form_dropdown"
            />
          </label>
        </div>

        <div className="w-full min-w-[150px] max-w-[200px] flex-1">
          <label className="flex flex-col">
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
              className="form_dropdown"
            />
          </label>
        </div>

        <div className="w-full min-w-[150px] max-w-[200px] flex-1">
          <label className="flex flex-col">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form_input"
            />
          </label>
        </div>

        {showStreet && (
          <div className="w-full min-w-[150px] max-w-[200px] flex-1">
            <label className="flex flex-col">
              <span>Street</span>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="form_input"
              />
            </label>
          </div>
        )}
      </div>

      {showStreet && (
        <div className="min-w-[150px] flex-1">
          <label className="flex flex-col">
            <span>Street</span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="form_input"
            />
          </label>
        </div>
      )}
    </>
  );
};

export default LocationInput;
