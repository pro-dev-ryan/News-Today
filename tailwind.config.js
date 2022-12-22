/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*index.{html,js}', './**/*modal.html'],
  theme: {
    extend: {
      fontFamily:{
        'display':["'Josefin Sans', sans"],
        'text': ["'Nunito'"],
        'normal': ['Cabin']
      }
    },
  },
  plugins: [],
}
