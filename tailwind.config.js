const colors = require('tailwindcss/colors');

module.exports = {
  jit: true,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        brand: ['Pacifico', 'cursive'],
      },
      colors: {
        amber: colors.amber,
        'warm-gray': colors.warmGray,
        orange: colors.orange,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
