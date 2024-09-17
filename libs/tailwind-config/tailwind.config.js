/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../libs/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 10s linear infinite',
        sparkleColor: 'sparkleColor 4s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(2)' },
          '100%': { transform: 'rotate(-360deg) scale(2)' },
        },
        sparkleColor: {
          '0%': { color: '#e92a67' },
          '50%': { color: '#a853ba' },
          '75%': { color: '#2a8af6' },
          '100%': { color: '#e92a67' },
        },
      },
    },
  },
}
