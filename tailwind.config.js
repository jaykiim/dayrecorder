module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: () => ({
        green: {
          black: '#434648',
          900: '#497173',
          700: '#839EA0',
          500: '#D6E4E5',
          300: '#EFF5F5',
        },
        carrot: { light: '#F08D72', deep: '#EB6440' },
      }),
      height: () => ({
        100: '27rem',
        120: '36rem',
      }),
    },
  },
  plugins: [],
}
