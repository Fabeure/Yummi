/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      gris: "#7F7F7F",
      gris_clair: "#E8E8E8",
      bg: "#FFFBF3",
      main: "#CD5C08",
      darker_main: "#b04f07",
      second_main: "#6A9C89",
      darker_second_main: "#618c7c",
      light_green: "#E6F4E8",
      light_red: "#fad3c0",

      bg_fonce: "#FAEFDB",
      yellow: {
        300: "#fcd34d",
      },
    },
    fontFamily: {
      'playfair': ['Playfair', 'serif'],
      'inter': ['Inter', 'sans-serif'],
      'playfair': ['Playfair', 'serif']
    },
    extend: {},
  },
  plugins: [],
};
