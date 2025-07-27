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
      boxShadow: {
        'card-hover': '0 6px 15px rgba(255, 191, 0, 0.2)',
      },
      backgroundImage: {
        'card-gradient-light':
          'linear-gradient(to top right, #ffffff, #f4f4f5, #ffffff)',
        'card-gradient-dark':
          'linear-gradient(to top right, #18181b, #27272a, #18181b)',
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
    container: {
      center: true,
      screens: {
        '2xl': '2400px',
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
