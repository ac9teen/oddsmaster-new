/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "section-bg": "var(--section-bg)",
        card: "var(--card-bg)",
        "card-border": "var(--card-border)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        secondary: "var(--secondary)",
        "input-bg": "var(--input-bg)",
        "input-border": "var(--input-border)",
      },
    },
  },
  plugins: [],
};
