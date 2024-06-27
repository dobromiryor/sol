import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "rgb(var(--text) / <alpha-value>)",
        "inverted-text": "rgb(var(--inverted-text) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
} satisfies Config;
