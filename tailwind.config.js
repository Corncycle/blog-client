/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/*.js', './src/components/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        fjalla: ['"Fjalla One"', 'sans-serif'],
      },
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
