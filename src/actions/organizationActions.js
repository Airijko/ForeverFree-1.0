'use server';

import { connectToDB } from '@utils/database';
import Organization from '@models/organization';
import { revalidatePath } from 'next/cache';
import Card from '@components/Card';

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

// ✅ Register a new organization
export const registerOrganization = async (formData) => {
  try {
    await connectToDB();

    const newOrganization = new Organization({
      owner: formData.get('owner'),
      name: formData.get('name'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      image: formData.get('image'),
      church: formData.get('church'),
      denomination: formData.get('denomination'),
      isApproved: formData.get('isApproved') === 'true',
      isChurch: formData.get('isChurch') === 'true',
      type: formData.get('type'),
    });

    await newOrganization.save();
    revalidatePath('/communities');

    return newOrganization;
  } catch (error) {
    console.error('Error registering organization:', error);
    return { error: 'Failed to register organization', status: 500 };
  }
};

// ✅ Update an existing organization
export const updateOrganization = async (id, formData) => {
  try {
    await connectToDB();

    const existingOrganization = await Organization.findById(id);
    if (!existingOrganization) {
      return { error: 'Organization not found', status: 404 };
    }

    Object.assign(existingOrganization, {
      name: formData.get('name'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      isApproved: formData.get('isApproved') === 'true',
      isChurch: formData.get('isChurch') === 'true',
    });

    await existingOrganization.save();
    revalidatePath(`/communities/${id}`);

    return existingOrganization;
  } catch (error) {
    console.error('Error updating organization:', error);
    return { error: 'Failed to update organization', status: 500 };
  }
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
