module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/developer/**/*.{js,jsx,ts,tsx}"],
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
