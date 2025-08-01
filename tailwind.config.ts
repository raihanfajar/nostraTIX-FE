import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Ini adalah konfigurasi font dari pertanyaan Anda sebelumnya
        // Anda bisa langsung melanjutkan dari sini
        bitcount: ['var(--font-bitcount)'],
      },
    },
  },
  plugins: [],
};
export default config;