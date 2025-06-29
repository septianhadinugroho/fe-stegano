/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#1a202c',
        'brand-secondary': '#2d3748',
        'brand-accent': '#3b82f6', // Biru yang lebih cerah
      }
    },
  },
  // Tambahkan daisyUI sebagai plugin
  plugins: [require('daisyui')],
  // Konfigurasi daisyUI
  daisyui: {
    themes: ["dark"], // Menggunakan tema gelap bawaan
  },
}