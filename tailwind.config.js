/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080A0F',
        surface: '#0E1117',
        border: '#1C2130',
        accent: '#4F7FFF',
        accent2: '#00E5C3',
        muted: '#5A6478',
        'text-primary': '#E8EDF5',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
