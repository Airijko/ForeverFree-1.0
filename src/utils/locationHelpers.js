// src/utils/locationHelpers.js
export const matchesLocation = (communityLocation, locationSearch) => {
  if (!locationSearch) return true;
  if (!communityLocation) return false;

  const combinedLocation = [
    communityLocation.city,
    communityLocation.region,
    communityLocation.country,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const searchWords = locationSearch.toLowerCase().split(/\s+/);

  return searchWords.every((word) => combinedLocation.includes(word));
};
