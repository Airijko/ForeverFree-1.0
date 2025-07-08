'use server';

export async function getCoordinatesFromAddress(location) {
  if (!location) return null;

  const { street, city, province, country } = location;
  const query = [street, city, province, country].filter(Boolean).join(', ');
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  try {
    const userAgentEmail = process.env.CONTACT_EMAIL || 'default@example.com';

    const res = await fetch(url, {
      headers: {
        'User-Agent': `ChristianEventsApp/1.0 (${userAgentEmail})`,
      },
      cache: 'force-cache',
    });

    if (!res.ok) {
      console.error('Geocoding failed:', res.statusText);
      return null;
    }

    const data = await res.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }

    console.warn('No geocoding results for:', query);
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function mapCoordinatesFromData(data) {
  if (!Array.isArray(data)) return [];

  const results = [];

  for (const event of data) {
    const loc = event?.location;
    if (!loc) continue;

    const coord = await getCoordinatesFromAddress(loc);
    if (coord?.lat && coord?.lng) results.push(coord);
  }

  return results;
}
