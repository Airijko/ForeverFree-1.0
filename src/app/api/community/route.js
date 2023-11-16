import { connectToDB } from '@utils/database';
import Organization from '@models/organization';

export const GET = async (req) => {
  try {
    await connectToDB();

    const organization = await Organization.find({}).populate('owner');

    return new Response(JSON.stringify(organization), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch organization', { status: 500 });
  }
};
