'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import OrganizationForm from '@components/OrganizationForm';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [organization, setOrganization] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isChurch: false,
    isApproved: false,
  });

  const registerOrganization = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          name: organization.name,
          userId: session?.user.id,
          email: organization.email,
          phone: organization.phone,
          address: organization.address,
          isChurch: organization.isChurch,
          isApproved: organization.isApproved,
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
      organization={organization}
      setOrganization={setOrganization}
      submitting={submitting}
      handleSubmit={registerOrganization}
    ></OrganizationForm>
  );
};

export default CreatePrompt;
