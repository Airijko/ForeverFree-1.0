/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937', // gray-800
        secondary: '#f9fafb', // gray-50
        accent: '#6366f1', // indigo-500
        dark: {
          background: '#191919', // gray-900
          surface: '#1f2937', // gray-800
          text: '#e5e7eb', // gray-200
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        shine: 'shine 0.75s ease-in-out forwards',
      },
      keyframes: {
        shine: {
          '0%': { left: '-75%' },
          '100%': { left: '125%' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};
