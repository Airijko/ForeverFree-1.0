'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex transform cursor-pointer select-none items-center justify-center rounded-full border border-gray-300 bg-gray-100 p-1.5 text-gray-700 shadow-sm transition duration-300 ease-in-out hover:scale-110 hover:border-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-300"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
