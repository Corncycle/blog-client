/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/*.js', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        fjalla: ['"Fjalla One"', 'sans-serif'],
        serif: ['"PT Serif"', 'serif'],
      },
      colors: {
        brown: 'brown',
        theme1: '#faf0ca',
        theme2: '#f4d35e',
        theme3: '#ee964b',
        theme4: '#f95738',
        theme5: '#0d3b66',
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
        'fade-in-slide-up': {
          '0%': { opacity: 0, transform: 'translateY(2em)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        ell1: {
          '0%': { opacity: '0%' },
          '35%': { opacity: '100%' },
          '80%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
        ell2: {
          '0%': { opacity: '0%' },
          '25%': { opacity: '0%' },
          '50%': { opacity: '100%' },
          '80%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
        ell3: {
          '0%': { opacity: '0%' },
          '50%': { opacity: '0%' },
          '65%': { opacity: '100%' },
          '80%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
      },
      animation: {
        'loading-bar-all':
          'loading-bar-right 1.5s cubic-bezier(0, 1, 1, 0.5) infinite, loading-bar-left 1.5s cubic-bezier(0, 0.5, 1, 0) infinite, fade-in-out 1.5s infinite',
        'fade-in-slide-up': 'fade-in-slide-up 0.8s',
        'fade-in': 'fade-in 0.4s',
        ell1: 'ell1 1.5s infinite',
        ell2: 'ell2 1.5s infinite',
        ell3: 'ell3 1.5s infinite',
      },
    },
  },
  plugins: [],
}
