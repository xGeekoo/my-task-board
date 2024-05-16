/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif']
      },
      colors: {
        'clr-white': '#F8FAFC',
        'clr-blue': '#3662E3',
        'clr-yellow': '#F5D565',
        'clr-orange': {
          light: '#F5E8D5',
          dark: '#E9A23B'
        },
        'clr-green': {
          light: '#A0ECB1',
          dark: '#32D657'
        },
        'clr-red': {
          light: '#F7D4D3',
          dark: '#DD524C'
        },
        'clr-gray': {
          light: '#E3E8EF',
          medium: '#00000033',
          dark: '#97A3B6'
        }
      }
    }
  },
  plugins: []
};
