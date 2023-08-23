/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        // buttons
        cta: '#7814ff',
        // background
        backdrop: '#fff',
        // button background
        contrast: ' #000',
      }
    }
  },
  plugins: []
};
