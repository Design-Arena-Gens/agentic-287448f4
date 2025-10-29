import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00D9FF',
          50: '#E0FAFF',
          100: '#B8F4FF',
          200: '#90EEFF',
          300: '#68E8FF',
          400: '#40E2FF',
          500: '#00D9FF',
          600: '#00B8DB',
          700: '#0097B7',
          800: '#007693',
          900: '#00556F',
        },
        sapphire: {
          DEFAULT: '#0F52BA',
          50: '#E8F0FF',
          100: '#C2DCFF',
          200: '#9BC7FF',
          300: '#75B3FF',
          400: '#4E9EFF',
          500: '#2889FF',
          600: '#0F52BA',
          700: '#0C4096',
          800: '#092E72',
          900: '#061C4E',
        },
        mint: {
          DEFAULT: '#98FF98',
          50: '#F0FFF0',
          100: '#D9FFD9',
          200: '#C2FFC2',
          300: '#ABFFAB',
          400: '#98FF98',
          500: '#7AE67A',
          600: '#5CCC5C',
          700: '#3EB33E',
          800: '#209920',
          900: '#028002',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
