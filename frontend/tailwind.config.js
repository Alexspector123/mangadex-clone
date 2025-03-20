module.exports = {
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          poppins: ["Poppins", "sans-serif"],
          spartan: ["Spartan", "sans-serif"],
        },
      },
    },
    plugins: [
      require('tailwind-scrollbar-hide')
    ],
  };
  