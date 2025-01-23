/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F5ECD8',
          300: '#EFE2C3',
          400: '#E9D8AE',
          500: '#E3CE99',
          600: '#D4BA77',
          700: '#C5A655',
          800: '#B69233',
          900: '#8C6F27',
        },
        brown: {
          50: '#F9F7F5',
          100: '#F3EFEB',
          200: '#E7DFD7',
          300: '#DBCFC3',
          400: '#CFBFAF',
          500: '#C3AF9B',
          600: '#B79F87',
          700: '#AB8F73',
          800: '#8B715A',
          900: '#6B5341',
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
} 