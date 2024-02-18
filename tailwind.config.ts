import type { Config } from 'tailwindcss'

export default {
  content: [
   // './node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
} satisfies Config

