'use server';

import { connectToDB } from '@utils/database';
import Organization from '@models/organization';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import OrganizationCard from '@components/Cards/OrganizationCard';
import { handleFileUpload } from '@utils/fileUpload';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Fetch all organizations with optional filters
export const fetchAllOrganizations = async (
  search = '',
  type = '',
  country = '',
  region = '',
  city = '',
  tag = ''
) => {
  try {
    await connectToDB();

    const filter = {};

    // Keyword search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { denomination: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Type filter
    if (type) {
      filter.type = type;
    }

    // Location filters
    if (country)
      filter['location.country'] = { $regex: country, $options: 'i' };
    if (region) filter['location.region'] = { $regex: region, $options: 'i' };
    if (city) filter['location.city'] = { $regex: city, $options: 'i' };

    if (tag) filter.tags = { $regex: tag, $options: 'i' };

    const organizations = await Organization.find(filter).populate('owner');

    return JSON.parse(JSON.stringify(organizations));
  } catch (error) {
    console.error('Error fetching all organizations:', error);
    return { error: 'Failed to fetch organizations', status: 500 };
  }
};

export const mapOrganizations = async (data) => {
  return data.map((organization, index) => (
    <OrganizationCard
      organization={organization}
      key={organization._id}
      index={index}
    />
  ));
};

// ✅ Fetch a single organization
export const fetchOrganization = async (id) => {
  try {
    await connectToDB();
    const organization = await Organization.findById(id).populate('owner');

    if (!organization) {
      return { error: 'Organization not found', status: 404 };
    }

    // Convert to plain object for Client Components
    return JSON.parse(JSON.stringify(organization));
  } catch (error) {
    console.error('Error fetching organization:', error);
    return { error: 'Failed to fetch organization', status: 500 };
  }
};

const extractOrganizationData = async (formData) => {
  const type = formData.get('type');
  const isChurch = type === 'church';

  // Debug: Log all form data
  // console.log('Form data entries:');
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  // Handle file uploads
  const imageFile = formData.get('image');
  const bannerFile = formData.get('banner');

  // === File size validation ===
  if (
    imageFile &&
    imageFile instanceof File &&
    imageFile.size > MAX_FILE_SIZE
  ) {
    return {
      error: 'Image file is too large. Maximum size is 5 MB.',
      status: 400,
    };
  }
  if (
    bannerFile &&
    bannerFile instanceof File &&
    bannerFile.size > MAX_FILE_SIZE
  ) {
    return {
      error: 'Banner file is too large. Maximum size is 5 MB.',
      status: 400,
    };
  }

  let imageUrl = null;
  let bannerUrl = null;

  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await handleFileUpload(imageFile, 'organizations');
  }
  if (bannerFile && bannerFile instanceof File && bannerFile.size > 0) {
    bannerUrl = await handleFileUpload(bannerFile, 'banners');
  }

  let services;
  if (isChurch) {
    const servicesRaw = formData.get('services');
    try {
      services = servicesRaw ? JSON.parse(servicesRaw) : [];

      // Transform the services to combine day/hour/minute/ampm into a single time string
      services = services.map((service) => ({
        ...service,
        times: service.times.map((timeObj) => ({
          day: timeObj.day,
          time: `${timeObj.hour}:${timeObj.minute} ${timeObj.ampm}`,
        })),
      }));
    } catch (error) {
      console.error('Failed to parse services JSON:', error);
      services = [];
    }
  }

  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    website: formData.get('website'),
    type,
    isChurch,
    language: formData.get('language') || 'English',
    services,
    description: formData.get('description') || '',
    denomination: isChurch ? formData.get('denomination') : undefined,
    isApproved: formData.get('isApproved') === 'true',
    location: {
      street: formData.get('street'),
      city: formData.get('city'),
      province: formData.get('province'),
      country: formData.get('country'),
    },
  };

  // Only add image/banner URLs if we have new uploads
  if (imageUrl) {
    data.image = imageUrl;
  }
  if (bannerUrl) {
    data.bannerUrl = bannerUrl;
  }

  return data;
};

const handleOrganization = async (id, formData, isEdit = false) => {
  const session = await getServerSession(options);

  // Check if user is authenticated
  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const userRole = session.user.role; // <-- Add this line
  const orgData = await extractOrganizationData(formData);

  try {
    await connectToDB();

    let organization;

    if (isEdit) {
      organization = await Organization.findById(id);
      if (!organization) {
        return { error: 'Organization not found', status: 404 };
      }

      // Allow if owner or admin
      if (organization.owner.toString() !== userId && userRole !== 'admin') {
        return {
          error:
            'Unauthorized: Only the owner or admins can edit this organization',
          status: 403,
        };
      }
    } else {
      // NEW: Add creator as owner and admin-level member
      organization = new Organization({
        ...orgData,
        owner: userId,
        members: [
          {
            user: userId,
            role: 'admin',
          },
        ],
      });
    }

    // Update with new data (excluding old file cleanup for simplicity)
    Object.assign(organization, orgData);

    await organization.save();

    revalidatePath('/communities');
    revalidatePath(`/communities/${organization._id}`);

    return JSON.parse(JSON.stringify(organization));
  } catch (error) {
    console.error(`Error during ${isEdit ? 'update' : 'registration'}:`, error);
    return {
      error: `Failed to ${isEdit ? 'update' : 'register'} organization`,
      status: 500,
    };
  }
};

export const createOrganization = async (formData) => {
  const newOrg = await handleOrganization(null, formData);
  if (newOrg && !newOrg.error) {
    redirect(`/communities/${newOrg._id}`);
  }
  return newOrg;
};

export const updateOrganization = async (id, formData) => {
  const updatedOrg = await handleOrganization(id, formData, true);
  if (updatedOrg && !updatedOrg.error) {
    redirect(`/communities/${id}`);
  }
  return updatedOrg;
};

// ✅ Delete an organization
export const deleteOrganization = async (id) => {
  const session = await getServerSession(options);

  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  try {
    await connectToDB();
    const organization = await Organization.findById(id);

    if (!organization) {
      return { error: 'Organization not found', status: 404 };
    }

    // Allow if owner or admin
    if (organization.owner.toString() !== userId && userRole !== 'admin') {
      return {
        error:
          'Unauthorized: Only the owner or admins can delete this organization',
        status: 403,
      };
    }

    await Organization.findByIdAndDelete(id);
    revalidatePath('/communities');
    return { message: 'Organization deleted successfully' };
  } catch (error) {
    console.error('Error deleting organization:', error);
    return { error: 'Failed to delete organization', status: 500 };
  }
};
