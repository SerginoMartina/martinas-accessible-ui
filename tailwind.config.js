/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#1F2937',
        accent: '#F59E0B',
        background: '#F9FAFB',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
