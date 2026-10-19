import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        gold: {
          DEFAULT: "hsl(var(--gold))",
          light: "hsl(var(--gold-light))",
          glow: "hsl(var(--gold-glow))",
          deep: "hsl(38, 70%, 40%)",
        },
        ivory: "hsl(var(--ivory))",
        champagne: "hsl(var(--champagne))",
        mehndi: {
          DEFAULT: "hsl(var(--mehndi))",
          light: "hsl(var(--mehndi-light))",
          deep: "hsl(145, 35%, 22%)",
        },
        barat: {
          DEFAULT: "hsl(350, 65%, 28%)",
          crimson: "hsl(350, 75%, 35%)",
          gold: "hsl(40, 65%, 52%)",
        },
        walima: {
          DEFAULT: "hsl(42, 50%, 60%)",
          pearl: "hsl(40, 30%, 97%)",
        },
        beige: "hsl(var(--beige))",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
        script: ["'Alex Brush'", "cursive"],
        cinzel: ["Cinzel", "serif"],
        arabic: ["Amiri", "serif"],
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
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(-20vh) scale(1)", opacity: "0" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        "dust-float": {
          "0%": { transform: "translate(0, 0)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translate(var(--dust-drift, 20px), -100px)", opacity: "0" },
        },
        "bokeh-pulse": {
          "0%, 100%": { opacity: "0.05", transform: "scale(1)" },
          "50%": { opacity: "0.15", transform: "scale(1.1)" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "breeze-drift": {
          "0%": { transform: "translate(0, 100vh) scale(0)", opacity: "0" },
          "20%": { opacity: "0.6" },
          "100%": { transform: "translate(60px, -20vh) scale(1)", opacity: "0" },
        },
        "wax-pulse": {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 4px 15px rgba(184, 134, 11, 0.4))" },
          "50%": { transform: "scale(1.05)", filter: "drop-shadow(0 6px 25px rgba(212, 175, 55, 0.7))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "particle-rise": "particle-rise 8s linear infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        "dust-float": "dust-float 10s ease-in-out infinite",
        "bokeh-pulse": "bokeh-pulse 5s ease-in-out infinite",
        "breeze-drift": "breeze-drift 10s linear infinite",
        "wax-pulse": "wax-pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
