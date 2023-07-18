/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/*.js', './src/components/*.js'],
  theme: {
    extend: {
      'max-w': {
        'custom-wide': '32rem',
      },
      textIndent: {
        reverse: '-1rem',
      },
    },
  },
  plugins: [],
}
