/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./reports/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        "on-background": "hsl(var(--on-background))",
        background: "hsl(var(--background))",
        "on-error-container": "hsl(var(--on-error-container))",
        error: "hsl(var(--error))",
        "on-error": "hsl(var(--on-error))",
        "error-container": "hsl(var(--error-container))",
        "outline-variant": "hsl(var(--outline-variant))",
        outline: "hsl(var(--outline))",
        "on-tertiary-container": "hsl(var(--on-tertiary-container))",
        tertiary: "hsl(var(--tertiary))",
        "on-tertiary": "hsl(var(--on-tertiary))",
        "tertiary-container": "hsl(var(--tertiary-container))",
        "inverse-surface": "hsl(var(--inverse-surface))",
        surface: "hsl(var(--surface))",
        "on-surface-variant": "hsl(var(--on-surface-variant))",
        "surface-variant": "hsl(var(--surface-variant))",
        "surface-tint": "hsl(var(--surface-tint))",
        "on-surface": "hsl(var(--on-surface))",
        "inverse-on-surface": "hsl(var(--inverse-on-surface))",
        "on-secondary": "hsl(var(--on-secondary))",
        secondary: "hsl(var(--secondary))",
        "on-secondary-container": "hsl(var(--on-secondary-container))",
        "secondary-container": "hsl(var(--secondary-container))",
        "on-primary-container": "hsl(var(--on-primary-container))",
        "on-primary": "hsl(var(--on-primary))",
        "inverse-primary": "hsl(var(--inverse-primary))",
        primary: "hsl(var(--primary))",
        "primary-container": "hsl(var(--primary-container))",
        shadow: "hsl(var(--shadow))",
        scrim: "hsl(var(--scrim))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
