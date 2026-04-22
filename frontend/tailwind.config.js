/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#FFFFFF",
          primary: "#5C4033",
          secondary: "#8B5E3C",
          accent: "#F5F5F5",
          success: "#2C7A4B",
          danger: "#B64040"
        }
      },
      borderRadius: {
        "2xl": "1rem"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(92, 64, 51, 0.08)",
        card: "0 10px 28px rgba(92, 64, 51, 0.07)"
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.35s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 }
        }
      }
    }
  },
  plugins: []
};
