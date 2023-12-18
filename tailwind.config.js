/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./assets/js/*.js",
    './index.html'
  ],
  theme: {
    extend: {
      // That is animation class, like animate-fade-in
      animation: {
        'fade-in': 'fade-in 0.8s ease-in-out',
        'fade-out': 'fade-out 0.8s ease-in-out',
      },

      // that is actual animation
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
              opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
              opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}