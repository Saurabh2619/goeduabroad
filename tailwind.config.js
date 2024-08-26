const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */


module.exports = {
  
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./components/OfferPopup.js",
    "./components/HomepageBlogs.js",
    "./components/GoogleReviews.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      fontFamily:{
        heading:["Playfair Display","sans-serif"],
        sans:["SF Pro Display","sans-serif"]
      },
      colors:{
        primary:"#a51c30"
      }
    },
  },
  
  plugins: [nextui()],
}

