// components/OrganizationProfile.jsx
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import ServiceInput from './Inputs/ServiceInput';
import ServiceTimesView from './Views/ServiceTimesView';

const OrganizationProfile = ({
  formData,
  isOwner = false,
  isEditing = false,
}) => {
  return (
    <section className="mx-auto max-w-5xl flex flex-col items-center mt-12 px-4">
      <div className="w-full bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-neutral-700">
        {/* Banner */}
        <div className="relative h-64 w-full bg-gray-200 dark:bg-neutral-800">
          {formData.bannerUrl ? (
            <Image
              src={formData.bannerUrl}
              alt={`${formData.name} banner`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
              No banner uploaded
            </div>
          )}
        </div>

        {/* Profile & Name */}
        <div className="relative px-6 -mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-neutral-900 bg-gray-100 shrink-0">
              <Image
                src={formData.image || '/assets/icons/cross-logo.jpg'}
                alt={`${formData.name} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div className="mb-0.5">
              {isEditing ? (
                <>
                  <input
                    name="name"
                    defaultValue={formData.name}
                    className="mt-1 w-full p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                    placeholder="Organization Name"
                  />
                  <input type="hidden" name="type" value={formData.type} />
                </>
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formData.name}
                </h1>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formData.type?.charAt(0).toUpperCase() +
                  formData.type?.slice(1)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 sm:mt-0 space-x-2">
            {isOwner && !isEditing && (
              <Link
                href={`/communities/${formData._id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Edit Page
              </Link>
            )}
            {isEditing && (
              <>
                <Link
                  href={`/communities/${formData._id}`}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pt-6 pb-8 space-y-6">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
              About
            </h2>
            {isEditing ? (
              <textarea
                name="description"
                defaultValue={formData.description || ''}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                rows={3}
                placeholder="Enter organization description"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {formData.description || 'No description provided.'}
              </p>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="space-y-1">
              {/* Address */}
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                {isEditing ? (
                  <input
                    name="address"
                    defaultValue={formData.address}
                    className="w-full p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                    placeholder="Address"
                  />
                ) : (
                  <span>{formData.address}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4" />
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
                    defaultValue={formData.email}
                    className="w-full p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                    placeholder="Email"
                  />
                ) : (
                  formData.email
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                {isEditing ? (
                  <input
                    name="phone"
                    defaultValue={formData.phone}
                    className="w-full p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                    placeholder="Phone number"
                  />
                ) : (
                  <p className="truncate">{formData.phone}</p>
                )}
              </div>
              {/* Language */}
              <div className="space-y-1">
                <div className="mt-4">
                  <strong>Language:</strong>{' '}
                  {isEditing ? (
                    <input
                      name="language"
                      defaultValue={formData.language || ''}
                      className="w-full p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                      placeholder="Language"
                    />
                  ) : (
                    <span>{formData.language}</span>
                  )}
                </div>
                {/* Denomination */}
                {formData.type === 'church' && (
                  <div>
                    <strong>Denomination:</strong>{' '}
                    {isEditing ? (
                      <input
                        name="denomination"
                        defaultValue={formData.denomination || ''}
                        className="w-full p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                        placeholder="Denomination"
                      />
                    ) : (
                      <span>{formData.denomination}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1">
              {/* Service Times (if church) */}
              {formData.type === 'church' &&
                (isEditing ? (
                  <ServiceInput initialServices={formData.services || []} />
                ) : (
                  <ServiceTimesView services={formData.services || []} />
                ))}

              {/* Approval Status */}
              <div>
                <strong>Approved:</strong>{' '}
                {isEditing ? (
                  <select
                    name="isApproved"
                    defaultValue={formData.isApproved ? 'true' : 'false'}
                    className="p-1 border border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                ) : formData.isApproved ? (
                  'Yes'
                ) : (
                  'No'
                )}
              </div>
            </div>
          </div>

          {/* Owner Info */}
          {!isEditing && formData.owner && (
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-md mt-6 text-sm">
              <h3 className="font-semibold mb-2">Owner Info</h3>
              <p>
                <strong>Username:</strong> {formData.owner.username}
              </p>
              <p>
                <strong>Email:</strong> {formData.owner.email}
              </p>
              <p>
                <strong>Role:</strong> {formData.owner.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrganizationProfile;
