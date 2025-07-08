'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // ✅ Initialize map only once
      mapInstance.current = L.map(mapRef.current).setView(
        [43.6532, -79.3832],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // ✅ Clean up on unmount
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-md z-0" />;
};

export default LeafletMap;
