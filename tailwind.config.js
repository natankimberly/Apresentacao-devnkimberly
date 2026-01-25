// Tailwind CSS v4 usually favors CSS-variables configuration, but for compatibility with existing v3-style config file:
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#020617', // Deep background
          800: '#0f172a',
          400: '#38bdf8', // Neon blue accent
          500: '#6366f1', // Neon violet accent
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'], // For terminal
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}
