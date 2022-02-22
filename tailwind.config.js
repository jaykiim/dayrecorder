module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        green: {
          black: '#434648',
          900: '#497173',
          700: '#839EA0',
          500: '#D6E3E6',
          400: '#AAC7C9',
          300: '#EFF5F5',
        },
        carrot: { light: '#F08D72', deep: '#EB6440' },
      }),
    },
  },
  plugins: [],
}
