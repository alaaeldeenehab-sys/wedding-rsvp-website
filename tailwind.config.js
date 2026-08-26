/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#faf1ed',
          200: '#f3e3da',
          300: '#ecc5b9',
          400: '#e39b8a',
          500: '#d97960',
          600: '#c85a47',
          700: '#a8463a',
          800: '#8a3a31',
          900: '#72312a',
        },
        accent: {
          50: '#fdf3f4',
          100: '#fce7e9',
          200: '#f9cfd5',
          300: '#f4b3be',
          400: '#ec6a81',
          500: '#e53e62',
          600: '#d4215c',
          700: '#b01850',
          800: '#921447',
          900: '#7a1240',
        },
      },
      fontFamily: {
        'arabic': ['Cairo', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
