/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mdsm: "375px",
      sm: "425px",
      md: "768px",
      textbox: "870px",
      lg: "1024px",
      mdlg: "1225px",
      xl: "1440px",
      xxl: "2560px",
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
