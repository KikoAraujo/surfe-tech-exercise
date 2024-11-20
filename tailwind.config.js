/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surfe: {
          lightBlue: "#ebfafe",
          darkBlue: "#073742",
          pink: "#ffa2ea",
        },
        neutral: {
          50: "#fafafa",
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(.19,1,.22,1)",
      },
      fontSize: {
        xxs: "11px",
      },
    },
  },
  plugins: [],
};
