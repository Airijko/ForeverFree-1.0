'use client';
import { useState } from 'react';

import {
  createOrganization,
  updateOrganization,
} from '@actions/organizationActions';
import { SubmitButton } from '@components/Buttons/SubmitButton';
import ImageCropper from '@components/ImageCropper';
import Link from 'next/link';

const CreateCommunity = ({ formData, edit = false }) => {
  const formId = formData?._id;
  const [selectedType, setSelectedType] = useState('');
  const [croppedImage, setCroppedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = e.target;
      const formData = new FormData(form);

      // Add cropped image if present
      if (croppedImage) {
        formData.append('image', croppedImage);
      }

      let result = null;
      if (edit) {
        result = await updateOrganization(formId, formData);
      } else {
        result = await createOrganization(formData);
      }

      if (result && !result.error) {
        // Handle success - maybe redirect or show success message
        console.log('Success:', result);
      } else {
        console.error('Error:', result?.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-start px-4">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {edit ? 'Edit' : 'Register'} Organization
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {edit ? 'Edit' : 'Register'} your Institution
      </p>

      <form
        onSubmit={handleSubmit}
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
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Phone
          </span>
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="form_input"
            required
          />
        </label>

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

        {/* Image Upload */}
        <label>
          <ImageCropper setImage={setCroppedImage} />
        </label>

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

        {selectedType === 'church' && (
          <div>
            <input
              name="denomination"
              type="text"
              placeholder="Denomination"
              className="form_input"
              required
            />
          </div>
        )}

        {/* Submit + Cancel */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <SubmitButton
            disabled={submitting}
            className="mt-4 flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-center text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </div>
      </form>
    </section>
  );
};

export default CreateCommunity;
