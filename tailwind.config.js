// This tells Tailwind: Scan index.html and Scan all .js and .jsx files in src/

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
