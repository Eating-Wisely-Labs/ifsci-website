/** @type {import('tailwindcss').Config} */
import aspectRatioPlugin from '@tailwindcss/aspect-ratio'

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#A4EF30'
      },
      second: {
        DEFAULT: '#335DBF'
      },
      white: {
        DEFAULT: '#FFFFFF'
      },
      black: {
        DEFAULT: '#000000'
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712'
      }
    },
    extend: {
      boxShadow: {
        primary:
          '0px 298px 84px 0px #00000000, 0px 12px 26px 0px #0000000A, 0px 48px 48px 0px #00000008, 0px 107px 64px 0px #00000005, 0px 191px 76px 0px #00000003'
      }
    }
  },
  plugins: [aspectRatioPlugin]
}
