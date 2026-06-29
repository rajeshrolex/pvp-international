/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bbdffa',
          300: '#7cc2f7',
          400: '#38a0f0',
          500: '#0f82d7',
          600: '#0263b6',
          700: '#034f94',
          800: '#07447a',
          900: '#0c3a66',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 
