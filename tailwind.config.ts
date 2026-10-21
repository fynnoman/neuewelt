import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0F10",
        paper: "#FBFBF9",
        fog: {
          50: "#F6F6F4",
          100: "#EEEDEA",
          200: "#E1E0DC",
          300: "#CBCAC5",
          400: "#A3A29D",
          500: "#7A7975",
          600: "#55544F",
          700: "#36352F",
          800: "#232320",
          900: "#141412",
        },
        signal: {
          DEFAULT: "#B6232A",
          soft: "#D64A50",
          deep: "#8E1A1F",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tight2: "-0.035em",
      },
      transitionTimingFunction: {
        horizon: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        slowdrift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-6px,0)" },
        },
      },
      animation: {
        slowdrift: "slowdrift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
