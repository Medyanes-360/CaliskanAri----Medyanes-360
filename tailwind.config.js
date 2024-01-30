/** @type {import('tailwindcss').Config} */


//###################################


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3d7bf1',
        secondary: '#313131',
        brandColor: '#ec1b24',
        primarydark: '#2b4ec6',
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
      '4xl': '2560px',
      // => @media (min-width: 2560px) { ... }
      '5xl': '3840px',
      // => @media (min-width: 3840px) { ... }
      '6xl': '7680px',
      // => @media (min-width: 7680px) { ... }
      '7xl': '15360px',
      // => @media (min-width: 15360px) { ... }
      '8xl': '30720px',
      // => @media (min-width: 30720px) { ... }
    }
  },
  plugins: [],
};