import { connectToDB } from '@utils/database';
import Organization from '@models/organization';

export const POST = async (req) => {
  const { userId, name, address, phone, email, image, isApproved, isChurch } =
    await req.json();

  try {
    await connectToDB();
    const newOrganization = new Organization({
      owner: userId,
      name,
      address,
      phone,
      email,
      image,
      isApproved,
      isChurch,
    });

    await newOrganization.save();

    return new Response(JSON.stringify(newOrganization), { status: 201 });
  } catch (error) {
    return new Response('Failed to register an arganization', { status: 500 });
  }
};
