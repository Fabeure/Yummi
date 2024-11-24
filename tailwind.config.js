/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors:{
      'gris':'#7F7F7F',
      'gris_clair':'#E8E8E8',
      'bg':'#FFFBF3',
      'main':'#CD5C08',
      'light_green':"#E6F4E8",
      'second_main':'#6A9C89',
      'bg_fonce':"#FAEFDB"
    },
    fontFamily:{
      'playfair':['Playfair','serif'],
      'inter':['Inter', 'sans-serif'],
      'playfair':['Playfair','serif']
    },
    extend: {},
  },
  plugins: [],
};
