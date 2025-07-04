import React from 'react';

function normalizeServices(services) {
  return (services || []).map((service) => ({
    ...service,
    times: (service.times || []).map((timeObj) => {
      if (timeObj.hour && timeObj.minute && timeObj.ampm) {
        return timeObj;
      }
      if (typeof timeObj.time === 'string') {
        const match = timeObj.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (match) {
          return {
            day: timeObj.day || 'Sunday',
            hour: match[1],
            minute: match[2],
            ampm: match[3].toUpperCase(),
            _id: timeObj._id,
          };
        }
      }
      return {
        day: timeObj.day || 'Sunday',
        hour: '10',
        minute: '00',
        ampm: 'AM',
        _id: timeObj._id,
      };
    }),
  }));
}

const ServiceTimesView = ({ services = [] }) => {
  const normalized = normalizeServices(services);
  if (!normalized.length) return null;
  return (
    <div>
      <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
        Services
      </span>
      {normalized.map((service, sIndex) => (
        <div
          key={sIndex}
          className="border rounded p-4 mb-4 bg-white dark:bg-gray-800"
        >
          <div className="font-semibold mb-2">{service.description}</div>
          <ul>
            {service.times.map((time, tIndex) => (
              <li key={tIndex}>
                {time.day}: {time.hour}:{time.minute} {time.ampm}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceTimesView;
