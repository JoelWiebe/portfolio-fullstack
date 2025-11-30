/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3765',
          '50': '#E8EAF6',
          '100': '#C5CAE9',
          '200': '#9FA8DA',
          '300': '#7986CB',
          '400': '#5C6BC0',
          '500': '#3F51B5',
          '600': '#1E3765', // U of T Blue
          '700': '#1A237E',
          '800': '#283593',
          '900': '#1A237E',
        },
      },
    },
  },
  plugins: [],
}
