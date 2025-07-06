import Link from 'next/link';
import React from 'react';

const AuthPrompt = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl flex flex-col items-center justify-center p-8 rounded-lg shadow-md bg-white dark:bg-slate-800 transform -translate-y-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          You&apos;re not signed in
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
          Please sign in to register your community and access this feature.
        </p>
        <Link
          href="/api/auth/signin"
          className="inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default AuthPrompt;
