import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        palette: {
          sage: "#3a4642",
          cocoa: "#574949",
          mauve: "#715256",
          wine: "#875861",
          rosewood: "#a45c6e",
          rose: "#c16277",
          petal: "#db6882",
          lace: "#e8b3bc",
          powder: "#edd3d3",
          porcelain: "#f2eae7",
        },
        blush: {
          50: "#f2eae7",
          100: "#edd3d3",
          200: "#e8b3bc",
          300: "#db6882",
          400: "#c16277",
          500: "#a45c6e",
          600: "#875861",
          700: "#715256",
          800: "#574949",
          900: "#3a4642",
        },
        plum: {
          50: "#f2eae7",
          100: "#edd3d3",
          200: "#e8b3bc",
          300: "#db6882",
          400: "#c16277",
          500: "#a45c6e",
          600: "#875861",
          700: "#715256",
          800: "#574949",
          900: "#3a4642",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 12px)",
        "3xl": "calc(var(--radius) + 24px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(219, 104, 130, 0.26)",
        "soft-pink": "0 24px 80px rgba(193, 98, 119, 0.18)",
      },
      backgroundImage: {
        "girly-gradient":
          "linear-gradient(135deg, rgba(219,104,130,0.95), rgba(135,88,97,0.92))",
        "dark-radial":
          "radial-gradient(circle at top left, rgba(219,104,130,0.2), transparent 34%), radial-gradient(circle at bottom right, rgba(58,70,66,0.32), transparent 32%)",
        "mesh-noise":
          "radial-gradient(circle at 20% 20%, rgba(232,179,188,0.14), transparent 25%), radial-gradient(circle at 80% 0%, rgba(161,92,110,0.16), transparent 28%), radial-gradient(circle at 60% 90%, rgba(219,104,130,0.12), transparent 30%)",
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
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
