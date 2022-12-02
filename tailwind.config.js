module.exports = {
  // content: ['./src/**/*.{js,jsx,ts,tsx}'],

  content: ['./src/user/components/common/**/*.{js,jsx,ts,tsx}', './src/user/components/checkout/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.4 },
        },
        popup: {
          '0%': { opacity: 0, marginTop: -12 },
          '100%': { opacity: 1, marginTop: 0 }
        }
      },
      animation: {
        opacity: "opacity 0.3s ease-in-out",
        popup: "popup 0.3s ease-in-out"
      }
    },
    container: {
      center: true,
      padding: {
        'DEFAULT': '0.5rem',
        'lg': '4rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}