import Link from 'next/link';
import React from 'react';

const AuthPrompt = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex w-full max-w-xl -translate-y-20 transform flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
          You&apos;re not signed in
        </h2>
        <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Please sign in to register your community and access this feature.
        </p>
        <Link
          href="/api/auth/signin"
          className="inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default AuthPrompt;
