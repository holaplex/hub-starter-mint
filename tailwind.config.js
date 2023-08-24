/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        cta: '#7814ff',
        backdrop: '#fff',
        contrast: ' #000',
        neautraltext: '#BDBDBD',
        subtletext: '#AAAAAA',
        cellsubtle: '#2B2B2B',
        success: '#628E36',
        failure: '#E4584F'
      }
    }
  },
  plugins: []
};
