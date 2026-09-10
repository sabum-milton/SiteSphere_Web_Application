/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#0f1111',
          charcoal: '#131921',
          blue: '#131921',
          midblue: '#232f3e',
          hover: '#37475a',
          orange: '#f90',
          orangehover: '#e88b0a',
          yellow: '#febd69',
          yellowhover: '#f3a847',
          link: '#007185',
          linkhover: '#c7511f',
          lightbg: '#eaeded',
          cardbg: '#ffffff',
          text: '#0f1111',
          subtle: '#565959',
          success: '#067d62',
          danger: '#b12704',
          border: '#d5d9d9',
          stargold: '#ffa41c',
        },
      },
      fontFamily: {
        sans: ['"Amazon Ember"', 'Arial', 'Helvetica', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};
