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
      backgroundImage: {
        'grid-light': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8651a' fill-opacity='0.06'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'dot-light': "radial-gradient(circle, #b8651a 1px, transparent 1px)",
        'dot-dark': "radial-gradient(circle, #c47c50 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
