import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				"center-inset-2": "0 0 2px 0 var(--tw-shadow-colored) inset",
			},
			screens: {
				xs: "360px",
			},
			colors: {
				text: "rgb(var(--text) / <alpha-value>)",
				"inverted-text": "rgb(var(--inverted-text) / <alpha-value>)",
				background: "rgb(var(--background) / <alpha-value>)",
				primary: "rgb(var(--primary) / <alpha-value>)",
				secondary: "rgb(var(--secondary) / <alpha-value>)",
				accent: "rgb(var(--accent) / <alpha-value>)",

				slate: {
					150: "#EAEFF5",
					250: "#D7DFE9",
					350: "#B0BCCD",
					450: "#7C8CA2",
					550: "#56657A",
					650: "#3D4B5F",
					750: "#293548",
					850: "#172033",
					950: "#090F21",
				},
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
		plugin(({ addComponents }) => {
			addComponents({
				".transition-allow-discrete": {
					"transition-behavior": "allow-discrete",
				},
			});
		}),
		({ addVariant }) => {
			addVariant("starting", "@starting-style");
		},
	],
} satisfies Config;
