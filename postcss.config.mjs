// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- Perubahan di sini
    autoprefixer: {},
  },
};

export default config;