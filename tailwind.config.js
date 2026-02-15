/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0B0F14',
        surface: '#0F1621',
        text: '#EAEFF5',
        muted: '#A9B4C2',
        'accent-electric': '#46C2FF',
        'accent-warm': '#FFB454',
        'accent-primary': '#4DA3FF',
        'accent-secondary': '#7B5CFF',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
