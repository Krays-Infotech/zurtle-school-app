/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#D5E1FD",
        lightBlue: "#F4F7FE",
        lightBlack: "#0C1517",
        lightGray: "#545969",
      },
      fontFamily: {
        kite: ['"Kite One"', "sans-serif"],
        mallanna: ['"Mallanna"', "sans-serif"],
        golos: ['"Golos Text"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
