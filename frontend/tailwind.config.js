/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 40px rgba(16, 24, 40, 0.12)'
      },
      colors: {
        moss: {
          50: '#f3fbf4',
          100: '#e4f7e8',
          200: '#c6ebcd',
          300: '#99d7a1',
          400: '#5dbf6f',
          500: '#3b9d5c',
          600: '#2c7d4d',
          700: '#235d3d',
          800: '#1e4e35',
          900: '#1a3d2d'
        },
        sun: '#f7d982',
        sky: '#dff7ff'
      }
    }
  },
  plugins: []
};
