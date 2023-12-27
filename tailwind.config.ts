import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2BD17E",
        error: "#EB5757",
        bgColor: "#093545",
        inputColor: "#224957",
        cardColor: "#092C39",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "2xl": "4rem",
        xl: "3rem",
        lg: "2rem",
        md: "1.5rem",
        base: "1.25rem",
        sm: "1rem",
        "body-sm": "0.875rem",
        "body-xs": "0.8rem",
      },
      lineHeight: {
        "2xl": "5rem",
        xl: "3.5rem",
        lg: "2.5rem",
        md: "2rem",
        base: "1.5rem",
        sm: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
