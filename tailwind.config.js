/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        yellow: {
          300: '#F3F36D'
        },
        gray: {
          300: '#BDBDBD',
          800: '#212122',
          900: '#1A1A1D'
        }
      }
    }
  },
  plugins: []
};
