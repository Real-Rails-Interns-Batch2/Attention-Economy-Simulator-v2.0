import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        card: "var(--bg-card)",
        "card-foreground": "var(--text-primary)",
        popover: "var(--bg-card)",
        "popover-foreground": "var(--text-primary)",
        primary: {
          DEFAULT: "var(--accent-blue)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-secondary)",
        },
        muted: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--bg-card-hover)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "var(--accent-rose)",
          foreground: "#ffffff",
        },
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--accent-blue)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [],
};
export default config;
