module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // "./stories/**/*.{js,ts,jsx,tsx}", //comment out as stories are for dev purposes only
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: {
        "sky-blue": "#38bdf8",
      },
      spacing: {
        97: "97%",
      },
      fontSize: {
        22: "22px",
      },
      textColor: {
        airbnb22: "#222222",
        "auth-gray": "#717171",
        "airbnb-red": "#FF385C",
        "spotify-green": "#1DB954",
      },
      backgroundColor: {
        "airbnb-red": "#FF385C",
      },
      backgroundImage: {
        "home-bg": 'url("https://links.papareact.com/0fm")',
        "radial-at-c":
          "radial-gradient(circle at center,var(--tw-gradient-stops))",
        "radial-red-variant":
          "radial-gradient(circle at center, rgb(255, 56, 92) 0%,rgb(230, 30, 77) 27.5%,rgb(227, 28, 95) 40%,rgb(215, 4, 102) 57.5%,rgb(189, 30, 89) 75%,rgb(189, 30, 89) 100%)",
      },
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      authGray: "#B0B0B0",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
