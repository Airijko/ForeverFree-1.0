import { connectToDB } from '@utils/database';
import Organization from '@models/organization';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Organization.findById(params.id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { name, address, phone, email, isApproved, isChurch } =
    await req.json();
  try {
    await connectToDB();

    const existingOrganization = await Organization.findById(params.id);
    if (!existingOrganization)
      return new Response('Organization not found', { status: 404 });

    existingOrganization.name = name;
    existingOrganization.address = address;
    existingOrganization.phone = phone;
    existingOrganization.email = email;
    existingOrganization.isApproved = isApproved;
    existingOrganization.isChurch = isChurch;

    await existingOrganization.save();

    return new Response(JSON.stringify(existingOrganization), { status: 200 });
  } catch (error) {
    return new Response('Failed to update organization', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Organization.findByIdAndRemove(params.id);

    return new Response('Organization deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete organization', { status: 500 });
  }
};
