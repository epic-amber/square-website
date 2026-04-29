/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Mona Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Bitter"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

