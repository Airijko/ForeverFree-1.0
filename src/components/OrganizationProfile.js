// components/OrganizationProfile.jsx
import Image from 'next/image';
import Link from 'next/link';
const OrganizationProfile = ({
  formData,
  isOwner = false,
  isEditing = false,
}) => {
  return (
    <section className="mx-auto flex flex-col items-center mt-12">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Banner */}
        <div className="relative h-64 w-full bg-gray-200">
          {formData.bannerUrl ? (
            <Image
              src={formData.bannerUrl}
              alt={`${formData.name} banner`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              {isEditing ? (
                <label className="cursor-pointer">
                  <span>Upload banner</span>
                  <input type="file" name="banner" className="sr-only" />
                </label>
              ) : (
                'No banner image'
              )}
            </div>
          )}
        </div>

        {/* Profile & Name */}
        <div className="relative -mt-16 flex items-end justify-between px-6">
          {/* Profile Icon */}
          <div className="relative h-32 w-32 border-4 border-white rounded-full overflow-hidden bg-gray-100">
            {formData.image ? (
              <Image
                src={formData.image}
                alt={`${formData.name} profile`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-xs text-center">
                {isEditing ? (
                  <label className="cursor-pointer">
                    <span>Upload image</span>
                    <input type="file" name="image" className="sr-only" />
                  </label>
                ) : (
                  'No image'
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isOwner && !isEditing && (
            <Link
              href={`/communities/${formData._id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Edit Page
            </Link>
          )}

          {isEditing && (
            <div className="space-x-2">
              <Link
                href={`/communities/${formData._id}`}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="px-6 mt-4 space-y-4">
          {/* Name */}
          {isEditing ? (
            <input
              type="text"
              name="name"
              defaultValue={formData.name}
              className="text-2xl font-bold w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent"
              placeholder="Organization Name"
              required
            />
          ) : (
            <h1 className="text-2xl font-bold">{formData.name}</h1>
          )}

          {/* Description */}
          {isEditing ? (
            <textarea
              name="description"
              defaultValue={formData.description || ''}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
              placeholder="Organization description..."
              rows={3}
            />
          ) : (
            <p className="text-gray-700">
              {formData.description || 'No description'}
            </p>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            {/* Type */}
            <div>
              <strong>Type:</strong>{' '}
              {isEditing ? (
                <select
                  name="type"
                  defaultValue={formData.type}
                  className="ml-2 p-1 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="church">Church</option>
                  <option value="organization">Organization</option>
                  <option value="school">School</option>
                </select>
              ) : (
                formData.type
              )}
            </div>

            {/* Address */}
            <div>
              <strong>Address:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  defaultValue={formData.address}
                  className="ml-2 p-1 border border-gray-300 rounded w-full"
                  placeholder="Address"
                  required
                />
              ) : (
                formData.address
              )}
            </div>

            {/* Email */}
            <div>
              <strong>Email:</strong>{' '}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  defaultValue={formData.email}
                  className="ml-2 p-1 border border-gray-300 rounded w-full"
                  placeholder="Email"
                  required
                />
              ) : (
                formData.email
              )}
            </div>

            {/* Phone */}
            <div>
              <strong>Phone:</strong>{' '}
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  defaultValue={formData.phone}
                  className="ml-2 p-1 border border-gray-300 rounded w-full"
                  placeholder="Phone"
                  required
                />
              ) : (
                formData.phone
              )}
            </div>

            {/* Denomination (if church) */}
            {formData.type === 'church' && (
              <div>
                <strong>Denomination:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="denomination"
                    defaultValue={formData.denomination || ''}
                    className="ml-2 p-1 border border-gray-300 rounded w-full"
                    placeholder="Denomination"
                  />
                ) : (
                  formData.denomination
                )}
              </div>
            )}

            {/* Approved Status */}
            <div>
              <strong>Approved:</strong>{' '}
              {isEditing ? (
                <select
                  name="isApproved"
                  defaultValue={formData.isApproved ? 'true' : 'false'}
                  className="ml-2 p-1 border border-gray-300 rounded"
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

        {/* Owner Info (Optional) */}
        {!isEditing && (
          <div className="px-6 mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Owner Info</h2>
            <p>
              <strong>Username:</strong> {formData.owner?.username}
            </p>
            <p>
              <strong>Email:</strong> {formData.owner?.email}
            </p>
            <p>
              <strong>Role:</strong> {formData.owner?.role}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationProfile;
