export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        tight: "1.5",
      },
      fontFamily: {
        plantagen: ["Plantagen", "sans-serif"],
        sangBleu: ["SangBleu", "sans-serif"],
      },
      colors: {
        plantagen: {
          red: "#d82316",
          beige: "#ece2d7",
          soil: "#484645",
        },
        secondary: {
          shell: "#f5efea",
          sand: "#dfc4ae",
          leather: "#d09972",
          pine: "#475851",
          eucalyptus: "#5f8573",
          olive: "#898468",
          terracotta: "#f68b1f",
        },
      },
    },
  },
};
