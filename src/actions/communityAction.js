'use server';

import { connectToDB } from '@utils/database';
import Community from '@models/community';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import CommunityCard from '@components/Cards/CommunityCard';
import { handleFileUpload } from '@utils/fileUpload';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Fetch all communities with optional filters
export const fetchAllCommunities = async (
  search = '',
  country = '',
  region = '',
  city = '',
  tag = '',
  type = ''
) => {
  try {
    await connectToDB();

    const filter = {};

    // Category filter
    if (type) {
      filter.type = type;
    }

    // Keyword search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { denomination: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Location filters
    if (country)
      filter['location.country'] = { $regex: country, $options: 'i' };
    if (region) filter['location.region'] = { $regex: region, $options: 'i' };
    if (city) filter['location.city'] = { $regex: city, $options: 'i' };

    if (tag) filter.tags = { $regex: tag, $options: 'i' };

    const communities = await Community.find(filter).populate('owner');

    return JSON.parse(JSON.stringify(communities));
  } catch (error) {
    console.error('Error fetching communities:', error);
    return { error: 'Failed to fetch communities', status: 500 };
  }
};

export const mapCommunities = async (data) => {
  return data.map((community, index) => (
    <CommunityCard community={community} key={community._id} index={index} />
  ));
};

// ✅ Fetch a single community
export const fetchCommunity = async (id) => {
  try {
    await connectToDB();
    const community = await Community.findById(id).populate('owner');

    if (!community) {
      return { error: 'Community not found', status: 404 };
    }

    // Convert to plain object for Client Components
    return JSON.parse(JSON.stringify(community));
  } catch (error) {
    console.error('Error fetching community:', error);
    return { error: 'Failed to fetch community', status: 500 };
  }
};

const extractCommunityData = async (formData) => {
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
    imageUrl = await handleFileUpload(imageFile, 'communities');
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

const handleCommunity = async (id, formData, isEdit = false) => {
  const session = await getServerSession(options);

  // Check if user is authenticated
  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const userRole = session.user.role; // <-- Add this line
  const orgData = await extractCommunityData(formData);

  try {
    await connectToDB();

    let community;

    if (isEdit) {
      community = await Community.findById(id);
      if (!community) {
        return { error: 'Community not found', status: 404 };
      }

      // Allow if owner or admin
      if (community.owner.toString() !== userId && userRole !== 'admin') {
        return {
          error:
            'Unauthorized: Only the owner or admins can edit this community',
          status: 403,
        };
      }
    } else {
      // NEW: Add creator as owner and admin-level member
      community = new Community({
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
    Object.assign(community, orgData);

    await community.save();

    revalidatePath('/communities');
    revalidatePath(`/communities/${community._id}`);

    return JSON.parse(JSON.stringify(community));
  } catch (error) {
    console.error(`Error during ${isEdit ? 'update' : 'registration'}:`, error);
    return {
      error: `Failed to ${isEdit ? 'update' : 'register'} community`,
      status: 500,
    };
  }
};

export const createCommunity = async (formData) => {
  const newOrg = await handleCommunity(null, formData);
  if (newOrg && !newOrg.error) {
    redirect(`/communities/${newOrg._id}`);
  }
  return newOrg;
};

export const updateCommunity = async (id, formData) => {
  const updatedOrg = await handleCommunity(id, formData, true);
  if (updatedOrg && !updatedOrg.error) {
    redirect(`/communities/${id}`);
  }
  return updatedOrg;
};

// ✅ Delete an community
export const deleteCommunity = async (id) => {
  const session = await getServerSession(options);

  if (!session?.user?.id) {
    return { error: 'Unauthorized: You must be logged in', status: 401 };
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  try {
    await connectToDB();
    const community = await Community.findById(id);

    if (!community) {
      return { error: 'Community not found', status: 404 };
    }

    // Allow if owner or admin
    if (community.owner.toString() !== userId && userRole !== 'admin') {
      return {
        error:
          'Unauthorized: Only the owner or admins can delete this community',
        status: 403,
      };
    }

    await Community.findByIdAndDelete(id);
    revalidatePath('/communities');
    return { message: 'Community deleted successfully' };
  } catch (error) {
    console.error('Error deleting community:', error);
    return { error: 'Failed to delete community', status: 500 };
  }
};
