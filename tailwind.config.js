/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/*.js', './src/components/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        fjalla: ['"Fjalla One"', 'sans-serif'],
        serif: ['"PT Serif"', 'serif'],
      },
      colors: {
        brown: 'brown',
      },
      'max-w': {
        'custom-wide': '32rem',
      },
      textIndent: {
        reverse: '-1rem',
      },
      borderWidth: {
        1: '1px',
      },
      keyframes: {
        'loading-bar-right': {
          '0%': { right: '100%' },
          '100%': { right: '0%' },
        },
        'loading-bar-left': {
          '0%': { left: '0%' },
          '100%': { left: '100%' },
        },
        'fade-in-out': {
          '0%': { opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'loading-bar-all':
          'loading-bar-right 1.5s cubic-bezier(0, 1, 1, 0.5) infinite, loading-bar-left 1.5s cubic-bezier(0, 0.5, 1, 0) infinite, fade-in-out 1.5s infinite',
      },
    },
  },
  plugins: [],
}
