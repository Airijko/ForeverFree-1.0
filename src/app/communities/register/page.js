'use client';
import { useState } from 'react';

import { createOrganization } from '@actions/organizationActions';
import { SubmitButton } from '@components/Buttons/SubmitButton';
import ImageCropper from '@components/ImageCropper';
import Link from 'next/link';
import LanguageInput from '@components/Inputs/LanguageInput';
import PhoneInput from '@components/Inputs/PhoneInput';
import ServiceInput from '@components/Inputs/ServiceInput';

const CreateCommunity = () => {
  const [selectedType, setSelectedType] = useState('');
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);

  // Form action
  const clientAction = async (formData) => {
    if (croppedImage) {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], 'cropped-image.jpg', {
        type: 'image/jpeg',
      });
      formData.append('image', file);
    }

    if (formData.get('type') === 'church') {
      formData.append('services', JSON.stringify(services));
    }

    const result = await createOrganization(formData);

    if (result?.error) {
      console.error(result.error);
      setError(result.error);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-start px-4">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Register Organization</span>
      </h1>
      <p className="desc text-left max-w-md">Register your Institution</p>

      <form
        action={clientAction}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Name */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Name
          </span>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="form_input"
            required
          />
        </label>

        {/* Email */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Email
          </span>
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="form_input"
            required
          />
        </label>

        {/* Phone */}
        <PhoneInput name="phone" />

        {/* Address */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Address
          </span>
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="form_input"
            required
          />
        </label>

        {/* Language */}
        <LanguageInput />

        {/* Image Upload */}
        <ImageCropper setImage={setCroppedImage} />

        {/* Type */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Type
          </span>
          <select
            name="type"
            className="form_input"
            required
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="church">Church</option>
            <option value="organization">Organization</option>
            <option value="school">School</option>
          </select>
        </label>

        {/* Denomination + Services if church */}
        {selectedType === 'church' && (
          <>
            <input
              name="denomination"
              type="text"
              placeholder="Denomination"
              className="form_input"
              required
            />
            <ServiceInput
              isEditing
              onChange={(updatedServices) => setServices(updatedServices)}
            />
          </>
        )}

        {/* Submit + Cancel */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <SubmitButton className="mt-4 flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-center text-white hover:bg-gray-700">
            Submit
          </SubmitButton>
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </section>
  );
};

export default CreateCommunity;
