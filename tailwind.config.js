module.exports = {
  darkMode: 'class',
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // This tells Tailwind to look for classes in your React files
    ],
    theme: {
      extend: {
        animation: {
          colorCycle: "colorChange 10s linear infinite",
        },

  // for background color change
        keyframes: {
          colorChange: {
            "0%": { backgroundColor: "rgb(75, 0, 130)" }, /* Indigo */
            "25%": { backgroundColor: "rgb(34, 197, 94)" }, /* Emerald */
            "50%": { backgroundColor: "rgb(20, 184, 166)" }, /* Teal */
            "75%": { backgroundColor: "rgb(147, 51, 234)" }, /* Purple */
            "100%": { backgroundColor: "rgb(75, 0, 130)" }, /* Back to Indigo */
          },
        },
      },
    },
    plugins: [],
  }
  