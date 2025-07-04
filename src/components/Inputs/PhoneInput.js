'use client';

import { useState } from 'react';
import PhoneInputLib from 'react-phone-number-input';

const PhoneInput = ({
  name = 'phone',
  required = true,
  onChange: onParentChange,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (phone) => {
    setValue(phone || '');
    if (onParentChange) onParentChange(phone);
  };

  return (
    <label className="flex flex-col gap-1">
      <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
        Phone
      </span>
      <PhoneInputLib
        international
        defaultCountry="US"
        countryCallingCodeEditable={false}
        value={value}
        onChange={handleChange}
        className="form_input"
        name={name}
        required={required}
        placeholder="Enter phone number"
      />
    </label>
  );
};

export default PhoneInput;
