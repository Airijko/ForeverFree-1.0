'use server';

import { connectToDB } from '@utils/database';
import Organization from '@models/organization';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Card from '@components/Card';
import { handleFileUpload, deleteUploadedFile } from '@utils/fileUpload';

// ✅ Fetch all organizations
export const fetchAllOrganizations = async () => {
  try {
    await connectToDB();
    const organizations = await Organization.find().populate('owner');

    // Convert to plain objects for Client Components
    return JSON.parse(JSON.stringify(organizations));
  } catch (error) {
    console.error('Error fetching all organizations:', error);
    return { error: 'Failed to fetch organizations', status: 500 };
  }
};

export const mapOrganizations = async (data) => {
  return data.map((organization) => (
    <Card organization={organization} key={organization._id} />
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
  console.log('Form data entries:');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // Handle file uploads
  const imageFile = formData.get('image');
  const bannerFile = formData.get('banner');

  let imageUrl = null;
  let bannerUrl = null;

  // Only process files if they are actual File objects with content
  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await handleFileUpload(imageFile, 'organizations');
  }

  if (bannerFile && bannerFile instanceof File && bannerFile.size > 0) {
    bannerUrl = await handleFileUpload(bannerFile, 'banners');
  }

  const data = {
    name: formData.get('name'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    type,
    isChurch,
    description: formData.get('description') || '',
    denomination: isChurch ? formData.get('denomination') : undefined,
    isApproved: formData.get('isApproved') === 'true',
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
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;

  const orgData = await extractOrganizationData(formData);

  try {
    await connectToDB();

    let organization;
    let oldImageUrl = null;
    let oldBannerUrl = null;

    if (isEdit) {
      organization = await Organization.findById(id);
      if (!organization) {
        return { error: 'Organization not found', status: 404 };
      }

      // Check if the current user is the owner
      if (organization.owner.toString() !== userId) {
        return {
          error: 'Unauthorized: You can only edit organizations you own',
          status: 403,
        };
      }

      // Store old URLs for cleanup if new files are uploaded
      oldImageUrl = organization.image;
      oldBannerUrl = organization.bannerUrl;
    } else {
      organization = new Organization({
        ...orgData,
        owner: userId,
      });
    }

    // Update with new data (including new file URLs if any)
    Object.assign(organization, orgData);

    // Debug: Log the organization before saving
    console.log('Organization before save:', organization.toObject());

    await organization.save();

    // Debug: Log the organization after saving
    console.log('Organization after save:', organization.toObject());

    // Clean up old files if new ones were uploaded
    if (isEdit) {
      if (orgData.image && oldImageUrl && oldImageUrl !== orgData.image) {
        deleteUploadedFile(oldImageUrl);
      }
      if (
        orgData.bannerUrl &&
        oldBannerUrl &&
        oldBannerUrl !== orgData.bannerUrl
      ) {
        deleteUploadedFile(oldBannerUrl);
      }
    }

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
  try {
    await connectToDB();
    await Organization.findByIdAndDelete(id);
    revalidatePath('/communities');
    return { message: 'Organization deleted successfully' };
  } catch (error) {
    console.error('Error deleting organization:', error);
    return { error: 'Failed to delete organization', status: 500 };
  }
};
