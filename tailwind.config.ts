import type { Config } from "tailwindcss";

const config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontSize: {
      headingL: [
        "2.25rem",
        {
          fontWeight: "700",
          letterSpacing: "-1px",
          lineHeight: "2.0625rem",
        },
      ],
      headingM: [
        "1.5rem",
        {
          fontWeight: "700",
          letterSpacing: "-.75px",
          lineHeight: "1.375rem",
        },
      ],
      headingS: [
        ".9375rem",
        {
          fontWeight: "700",
          letterSpacing: "-0.25px",
          lineHeight: "1.5rem",
        },
      ],
      headingSVariant: [
        ".9375rem",
        {
          fontWeight: "700",
          letterSpacing: "-0.25px",
          lineHeight: ".9375rem",
        },
      ],
      body: [
        ".8125rem",
        {
          fontWeight: "400",
          letterSpacing: "-0.1px",
          lineHeight: "1.125rem",
        },
      ],
      bodyVariant: [
        ".8125rem",
        {
          fontWeight: "400",
          letterSpacing: "-0.25px",
          lineHeight: ".9375rem",
        },
      ],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        spartan: ["var(--font-spartan)"],
      },
      backgroundImage: {
        "checkbox-checked": "url('/assets/icon-check.svg')",
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
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
        "01": "hsl(252, 94%, 67%)",
        "02": "hsl(252, 100%, 73%)",
        "03": "hsl(233, 31%, 17%)",
        "04": "hsl(233, 30%, 21%)",
        "05": "hsl(231, 73%, 93%)",
        "06": "hsl(231, 20%, 61%)",
        "07": "hsl(231, 37%, 63%)",
        "08": "hsl(228, 29%, 7%)",
        "09": "hsl(0, 80%, 63%)",
        "10": "hsl(0, 100%, 80%)",
        "11": "hsl(240, 27%, 98%)",
        "12": "hsl(233, 30%, 11%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
