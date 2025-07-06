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
      className="
    p-1.5
    rounded-full
    bg-gray-100 dark:bg-neutral-800
    border border-gray-300 dark:border-neutral-600
    shadow-sm
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:bg-primary hover:border-primary
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
    text-gray-700 dark:text-gray-300
    flex items-center justify-center
    ml-2
    select-none
    transform
    hover:scale-110
  "
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
