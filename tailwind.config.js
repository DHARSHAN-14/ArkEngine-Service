/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        copper: {
          300: '#d4956a',
          400: '#c47c50',
          500: '#b8651a',
          600: '#a0521a',
        },
        amber: {
          warm: '#d4871e',
        },
        cream: {
          50: '#fefdf9',
          100: '#fdf8ef',
          200: '#f9f0de',
        },
        charcoal: {
          800: '#2a2420',
          900: '#1a1614',
          950: '#110e0c',
        },
        forest: {
          400: '#5a9a6e',
          500: '#4a8a5e',
          600: '#3a7a4e',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
