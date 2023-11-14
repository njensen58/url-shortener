/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html', "./node_modules/tw-elements-react/dist/js/**/*.js"],
  theme: {
    extend: {
      // Example of custom extension
      // colors: {
      //   primary: "#0ea5e9"
      // }
    },
  },
  plugins: [],
}

