/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        librebaskerville: ["librebaskerville", "serif"],
        librebaskervilleItalic: ["librebaskerville-italic", "serif"],
        poppins: ["poppins", "sans-serif"],
      },

      keyframes: {
        bounceX: {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(10px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        moveStripes: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)", // Adjust this value for desired vertical movement
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        'fill-pulse': {
          '0%, 100%': { fill: 'rgb(74 222 128)' }, // green-400
          '50%': { fill: 'rgb(168 85 247)' }, // purple-500
        },
      },
      animation: {
        bounceX: "bounceX 1s infinite",
        scalePulse: "scalePulse 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        moveStripes: "moveStripes 2s linear infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        'fill-pulse': 'fill-pulse 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
