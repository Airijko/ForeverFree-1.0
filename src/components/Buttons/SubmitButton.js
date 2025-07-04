'use client';

import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ children, className }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {children}
    </button>
  );
};
