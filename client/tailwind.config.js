/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: {
      //     '50': '#e5f2ff',
      //     '100': '#b8d7ff',
      //     '200': '#8abeff',
      //     '300': '#5ca4ff',
      //     '400': '#2e89ff',
      //     '500': '#007fff', // Blue Base
      //     '600': '#0066cc',
      //     '700': '#004d99',
      //     '800': '#003366',
      //     '900': '#001a33',
      //   },

      // },
    },
  },
  plugins: [
    require("daisyui")
  ],
  
  daisyui: {
    themes: ["light", "dark", "synthwave", "retro"],
  },
}
