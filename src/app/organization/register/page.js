'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import OrganizationForm from '@components/organization/OrganizationForm';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log('session', session.user.id);

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    owner: session?.user.id,
    name: '',
    email: '',
    phone: '',
    address: '',
    image: '',
    isApproved: false,
    isChurch: false,
    church: '',
  });

  const registerOrganization = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/organization/new', {
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
    <OrganizationForm
      type="Register"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={registerOrganization}
    ></OrganizationForm>
  );
};

export default CreatePrompt;
