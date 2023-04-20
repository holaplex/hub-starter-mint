/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        cta: '#F3F36D',
        backdrop: '#1A1A1D',
        contrast: '#212122',
      }
    }
  },
  plugins: []
};
