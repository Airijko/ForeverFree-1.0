'use client';
import { useState } from 'react';

import { createOrganization } from '@actions/organizationAction';
import { SubmitButton } from '@components/Buttons/SubmitButton';
import ImageCropper from '@components/ImageCropper';
import Link from 'next/link';
import LanguageInput from '@components/Inputs/LanguageInput';
import PhoneInput from '@components/Inputs/PhoneInput';
import ServiceInput from '@components/Inputs/ServiceInput';
import LocationInput from '@components/Inputs/LocationInput';

const CreateCommunityForm = () => {
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
    <form
      action={clientAction}
      className="glassmorphism flex w-full flex-col gap-5 bg-neutral-100 p-5"
    >
      {/* Name */}
      <label>
        <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-300">
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
        <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-300">
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Location   */}
        <LocationInput />

        <div className="flex h-full flex-col">
          {/* Website */}
          <label>
            <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-300">
              Website
            </span>
            <input
              name="website"
              type="text"
              placeholder="Website"
              className="form_input"
            />
          </label>

          <LanguageInput />

          {/* Type */}
          <label>
            <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-300">
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
          {/* Image Upload */}
          <div className="ml-auto mt-auto">
            <ImageCropper setImage={setCroppedImage} />
          </div>
        </div>
      </div>

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
        <Link href="/" className="text-sm text-gray-500">
          Cancel
        </Link>
        <SubmitButton className="mt-4 flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-center text-white hover:bg-gray-700">
          Submit
        </SubmitButton>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
    </form>
  );
};

export default CreateCommunityForm;
