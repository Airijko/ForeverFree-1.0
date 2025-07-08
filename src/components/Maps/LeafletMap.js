'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LeafletMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Helper: remove all markers from map
    const clearMarkers = () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };

    if (
      mapRef.current &&
      !mapInstance.current &&
      Array.isArray(location) &&
      location.length > 0 &&
      typeof location[0].lat === 'number' &&
      typeof location[0].lng === 'number'
    ) {
      // Initialize map centered at the first marker location
      mapInstance.current = L.map(mapRef.current).setView(
        [location[0].lat, location[0].lng],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Add all markers
      markersRef.current = location.map((loc) =>
        L.marker([loc.lat, loc.lng])
          .addTo(mapInstance.current)
          .on('click', () => {
            // Construct Google Maps URL
            const googleMapsUrl = `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;
            window.open(googleMapsUrl, '_blank');
          })
      );
    } else if (mapInstance.current && Array.isArray(location)) {
      clearMarkers();
      // Add all markers
      markersRef.current = location.map((loc) =>
        L.marker([loc.lat, loc.lng]).addTo(mapInstance.current)
      );
    }

    return () => {
      clearMarkers();
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [location]);

  return <div ref={mapRef} className="w-full h-full rounded-md z-0" />;
};

export default LeafletMap;
