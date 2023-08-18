import { connectToDB } from '@utils/database';
import Role from '@models/prompt';

export const GET = async (req) => {
  try {
    await connectToDB();

    const roles = await Role.find({});

    return new Response(JSON.stringify(roles), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all roles', { status: 500 });
  }
};
