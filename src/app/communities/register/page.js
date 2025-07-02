'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import CommunitiesForm from '@components/communties/CommunitiesForm';

const CreateCommunity = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    owner: session?.user.id,
    name: '',
    email: '',
    phone: '',
    address: '',
    image: '',
    isApproved: false,
    type: '',
    denomination: '',
  });

  const registerCommunity = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/community/new', {
        method: 'POST',
        body: JSON.stringify({
          owner: formData.owner,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          image: formData.image,
          isChurch: formData.isChurch,
          isApproved: formData.isApproved,
          type: formData.type,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommunitiesForm
      type="Register"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={registerCommunity}
    ></CommunitiesForm>
  );
};

export default CreateCommunity;
