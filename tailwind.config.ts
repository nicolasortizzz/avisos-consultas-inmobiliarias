import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ivory: { DEFAULT: "#f7f4ee", 100: "#f2ede3", 200: "#e8e0d1" },
        ink: { DEFAULT: "#1d2a25", soft: "#46524c", mute: "#7a837e" },
        forest: { 50: "#eef4f0", 100: "#d8e6dd", 600: "#2f5c4b", 700: "#244a3c", 800: "#1b392e", 900: "#132a22" },
        clay: { 50: "#fbf1ea", 500: "#b5643c", 600: "#9c5231" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(29,42,37,.04), 0 8px 24px -8px rgba(29,42,37,.10)",
        lift: "0 2px 4px rgba(29,42,37,.05), 0 24px 48px -16px rgba(29,42,37,.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
