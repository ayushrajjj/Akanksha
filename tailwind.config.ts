import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fbfaf4",
          100: "#f4f0e6",
        },
        sage: {
          50: "#eff6f1",
          100: "#dce8dd",
          200: "#bfd2c0",
          300: "#98b89b",
          500: "#5f8b67",
          700: "#385541",
          900: "#203329",
        },
        forest: {
          700: "#24372e",
          800: "#1e2f27",
          900: "#15231c",
        },
        peach: {
          100: "#fde9dc",
          200: "#f8d4bf",
          300: "#f1b592",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(44, 72, 54, 0.12)",
        glow: "0 18px 60px rgba(107, 150, 108, 0.18)",
      },
      backgroundImage: {
        "hero-wellness":
          "radial-gradient(circle at top left, rgba(160, 190, 150, 0.28), transparent 35%), radial-gradient(circle at 90% 20%, rgba(248, 181, 146, 0.24), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.9), rgba(251,250,244,1))",
      },
      fontFamily: {
        sans: ["'Helvetica Neue'", "Segoe UI", "system-ui", "sans-serif"],
        display: ["'Helvetica Neue'", "Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
