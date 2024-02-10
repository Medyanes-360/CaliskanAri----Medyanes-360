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
        cream: "#FAF9F6",
        cst_purple: "#241442",//"#241442",
        buttonColor: "#543EE8", //"#543EE8",
        cst_grey: "#4f536c",
        cst_green: "#45C8C2",
        cst_red: "#A94E57",
        lightgrey: "#9D9CAE",
        cst_pink: "#FBA3E3",
        card: "#F8F8F8",
        cst_yellow: "#FEC269",
        lightpink: "#F1BBBB",
        bluegreen: "#6CE1DC",
        lightgreen: "#98DF76",
        lightpurple: "#B1A8FF",
        tabs: "#9D9CAE",
        videocover: "#21123F",
        banner: "#110E19",
        plant: "#543EE81A",
        lightyellow: "#ffcd1f",
        cst_orange: "#FF9D95",
        brandColor: '#ec1b24',
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
  plugins: [],
};