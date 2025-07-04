'use client';
import React, { useState, useEffect, useRef } from 'react';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const hours = [...Array(12)].map((_, i) => (i + 1).toString());
const minutes = ['00', '15', '30', '45'];
const ampmOptions = ['AM', 'PM'];

const defaultTime = { day: 'Sunday', hour: '10', minute: '00', ampm: 'AM' };
const defaultService = { description: '', times: [defaultTime] };

const ServiceInput = ({ initialServices = [], onChange }) => {
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

  const [services, setServices] = useState(() =>
    initialServices.length
      ? normalizeServices(initialServices)
      : [defaultService]
  );
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(services);
    }
  }, [services]);

  const updateService = (index, changes) => {
    setServices((prev) =>
      prev.map((service, i) =>
        i === index ? { ...service, ...changes } : service
      )
    );
  };

  const updateServiceTime = (sIndex, tIndex, field, value) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[sIndex].times[tIndex][field] = value;
      return [...updated];
    });
  };

  const addService = () => {
    setServices((prev) => [...prev, { ...defaultService }]);
  };

  const removeService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const addServiceTime = (sIndex) => {
    setServices((prev) => {
      const updated = [...prev];
      // Create a new times array instead of mutating
      updated[sIndex] = {
        ...updated[sIndex],
        times: [...updated[sIndex].times, { ...defaultTime }],
      };
      return updated;
    });
  };

  const removeServiceTime = (sIndex, tIndex) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[sIndex].times = updated[sIndex].times.filter(
        (_, i) => i !== tIndex
      );
      return updated;
    });
  };

  return (
    <div>
      <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
        Services
      </span>

      <input
        type="hidden"
        name="services"
        ref={hiddenInputRef}
        defaultValue={JSON.stringify(services)}
        readOnly
      />

      {services.map((service, sIndex) => (
        <div
          key={sIndex}
          className="border rounded p-4 mb-4 bg-white dark:bg-gray-800"
        >
          <input
            type="text"
            placeholder="Service Description (e.g., English Service)"
            className="form_input mb-3"
            value={service.description}
            onChange={(e) =>
              updateService(sIndex, { description: e.target.value })
            }
            required
          />

          {service.times.map((time, tIndex) => (
            <div key={tIndex} className="flex gap-2 items-center flex-row">
              <select
                className="form_input flex-grow"
                value={time.day}
                onChange={(e) =>
                  updateServiceTime(sIndex, tIndex, 'day', e.target.value)
                }
                required
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                className="form_input"
                value={time.hour}
                onChange={(e) =>
                  updateServiceTime(sIndex, tIndex, 'hour', e.target.value)
                }
                required
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>

              <select
                className="form_input"
                value={time.minute}
                onChange={(e) =>
                  updateServiceTime(sIndex, tIndex, 'minute', e.target.value)
                }
                required
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>

              <select
                className="form_input"
                value={time.ampm}
                onChange={(e) =>
                  updateServiceTime(sIndex, tIndex, 'ampm', e.target.value)
                }
                required
              >
                {ampmOptions.map((ampm) => (
                  <option key={ampm} value={ampm}>
                    {ampm}
                  </option>
                ))}
              </select>

              {tIndex > 0 && (
                <button
                  type="button"
                  onClick={() => removeServiceTime(sIndex, tIndex)}
                  className="text-red-500 font-semibold"
                >
                  Remove Time
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addServiceTime(sIndex)}
            className="btn-primary px-4 py-1 rounded mt-3"
          >
            Add Service Time
          </button>

          {sIndex > 0 && (
            <button
              type="button"
              onClick={() => removeService(sIndex)}
              className="text-red-600 font-semibold mt-2 block"
            >
              Remove Service
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addService}
        className="btn-primary px-6 py-2 rounded"
      >
        Add Another Service
      </button>
    </div>
  );
};

export default ServiceInput;
