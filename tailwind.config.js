/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        cta: '#F6D357',
        backdrop: '#1A1A1D',
        contrast: ' #212122',
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
