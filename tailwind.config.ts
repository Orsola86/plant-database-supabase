import type { Config } from "tailwindcss";
import {
  animations,
  colors,
  containerStyles,
  focusStyle,
  gridStyles,
  headingStyles,
} from "./src/lib/tailwind";
import { PluginAPI } from "tailwindcss/types/config";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /([^\s]+)?bg-\S+/,
    },
    {
      pattern: /([^\s]+)?heading-\S+/,
    },
    {
      pattern: /([^\s]+)?text-\S+/,
    },
    {
      pattern: /([^\s]+)?txt-\S+/,
    },
    {
      pattern: /([^\s]+)?--\S+/,
    },
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        // ...colors,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-aria-attributes"),
    ({ addBase }: PluginAPI) => {
      addBase({
        html: {
          fontSize: "62.5%",
          fontFamily: "var(--font-roboto)",
        },
      });
    },
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        ...animations,
        ...gridStyles,
        ...focusStyle,
        ...headingStyles,
      });
    },
    ({ addComponents }: PluginAPI) => {
      addComponents({
        ...containerStyles,
      });
    },
    ({ addVariant }: PluginAPI) => {
      addVariant("interactive", ["&:hover", "&:active"]);
      addVariant("group-interactive", [".group:hover &", ".group:active &"]);
    },
  ],
} satisfies Config;

export default config;
