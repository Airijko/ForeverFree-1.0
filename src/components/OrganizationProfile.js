// components/OrganizationProfile.jsx
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import ServiceInput from './Inputs/ServiceInput';
import ServiceTimesView from './Views/ServiceTimesView';
import ImageUpload from './Inputs/ImageUpload';
import DynamicHeader from './DynamicHeader';
import LocationInput from './Inputs/LocationInput';

const OrganizationProfile = ({
  formData,
  isOwner = false,
  isEditing = false,
}) => {
  return (
    <section className="mainContent">
      <DynamicHeader bannerUrl={formData.bannerUrl}>
        <div className="mb-3 flex h-full w-full max-w-5xl flex-col items-center">
          {/* Banner */}
          <div className="relative h-full w-full overflow-hidden rounded-b-2xl bg-gray-200 dark:bg-neutral-800">
            {isEditing ? (
              <ImageUpload
                name="banner"
                className="absolute inset-0 h-full w-full"
                defaultImage={formData.bannerUrl}
                altText={`${formData.name} banner`}
              >
                <span className="absolute bottom-3 left-3 rounded-full bg-white p-2 shadow-md dark:bg-neutral-900">
                  <CameraIcon className="h-5 w-5" />
                </span>
              </ImageUpload>
            ) : formData.bannerUrl ? (
              <Image
                src={formData.bannerUrl}
                alt={`${formData.name} banner`}
                fill
                className="object-cover" // No need for rounded here
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                No banner uploaded
              </div>
            )}
          </div>

          {/* Profile & Name */}
          <div className="relative -mt-24 flex w-full flex-col items-center">
            <div className="flex flex-col gap-2">
              <div className="relative mx-auto h-32 w-32 shrink-0">
                <div className="h-full w-full shrink-0 overflow-hidden rounded-full border-4 border-white bg-gray-100 dark:border-neutral-900">
                  {isEditing ? (
                    <ImageUpload
                      name="image"
                      className="h-full w-full"
                      defaultImage={
                        formData.image || '/assets/icons/cross-logo.jpg'
                      }
                      altText={`${formData.name} logo`}
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={formData.image || '/assets/icons/cross-logo.jpg'}
                        alt={`${formData.name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <span className="absolute bottom-0 right-0 z-10 rounded-full bg-white p-2 shadow-md dark:bg-neutral-900">
                    <CameraIcon className="h-5 w-5" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 z-20">
          {isOwner && !isEditing && (
            <div className="flex items-center gap-2">
              <Link
                href={`/communities/${formData._id}/edit`}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Edit Page
              </Link>
              <Link
                href={`/communities/${formData._id}/events/create`}
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
              >
                Create Post
              </Link>
            </div>
          )}
          {isEditing && (
            <div className="flex items-center gap-2">
              <Link
                href={`/communities/${formData._id}`}
                className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </DynamicHeader>
      {/* Main Content */}
      <div className="w-full max-w-5xl overflow-hidden rounded-b-lg bg-white pt-4 shadow-md dark:bg-neutral-900">
        <div className="mb-0.5 text-center leading-none">
          {isEditing ? (
            <>
              <div className="flex items-center gap-2">
                <input
                  name="name"
                  defaultValue={formData.name}
                  className="rounded border border-gray-300 text-3xl font-bold dark:border-neutral-700 dark:bg-neutral-800"
                  placeholder="Organization Name"
                />
                <span className="select-none text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  •
                </span>
                <input
                  name="language"
                  defaultValue={formData.language || ''}
                  className="w-auto rounded border border-gray-300 text-2xl font-semibold dark:border-neutral-700 dark:bg-neutral-800"
                  placeholder="Language"
                />
              </div>
              <input type="hidden" name="type" value={formData.type} />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                <span className="whitespace-normal break-words">
                  {formData.name}
                </span>
                <span className="mx-2 text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  •
                </span>
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  {formData.language}
                </span>
              </h1>
            </>
          )}
        </div>
        <div className="space-y-6 px-6 pb-8 pt-6">
          {/* About Section */}
          <div>
            <h2 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">
              About
            </h2>
            {isEditing ? (
              <textarea
                name="description"
                defaultValue={formData.description || ''}
                className="w-full rounded-md border border-gray-300 p-2 dark:border-neutral-700 dark:bg-neutral-800"
                rows={3}
                placeholder="Enter organization description"
              />
            ) : (
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {formData.description || 'No description provided.'}
              </p>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 dark:text-gray-300 md:grid-cols-2">
            <div className="space-y-1">
              {/* Location */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  {isEditing ? (
                    <LocationInput formData={formData} isEditing />
                  ) : (
                    <span>
                      {formData.location?.street}, {formData.location?.city},{' '}
                      {formData.location?.region}, {formData.location?.country}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
                    defaultValue={formData.email}
                    className="w-full rounded border border-gray-300 p-1 dark:border-neutral-700 dark:bg-neutral-800"
                    placeholder="Email"
                  />
                ) : (
                  formData.email
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                {isEditing ? (
                  <input
                    name="phone"
                    defaultValue={formData.phone}
                    className="w-full rounded border border-gray-300 p-1 dark:border-neutral-700 dark:bg-neutral-800"
                    placeholder="Phone number"
                  />
                ) : (
                  <p className="truncate">{formData.phone}</p>
                )}
              </div>
              <div className="space-y-1">
                {/* Denomination */}
                {formData.type === 'church' && (
                  <div>
                    <strong>Denomination:</strong>{' '}
                    {isEditing ? (
                      <input
                        name="denomination"
                        defaultValue={formData.denomination || ''}
                        className="w-full rounded border border-gray-300 p-1 dark:border-neutral-700 dark:bg-neutral-800"
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
                    className="rounded border border-gray-300 p-1 dark:border-neutral-700 dark:bg-neutral-800"
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
          {!isEditing && isOwner && (
            <div className="mt-6 rounded-md bg-gray-50 p-4 text-sm dark:bg-neutral-800">
              <h3 className="mb-2 font-semibold">Owner Info</h3>
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
