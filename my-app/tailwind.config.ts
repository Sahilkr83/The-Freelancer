/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",   // ✅ required
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
    },
  },
  plugins: [],
}
