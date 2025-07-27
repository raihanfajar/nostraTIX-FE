import localFont from 'next/font/local';

// Deklarasikan font lokal Anda
export const bitcount = localFont({
  src: '../app/fonts/BitcountPropSingle.ttf', // Path relatif ke file font
  display: 'swap',
  variable: '--font-bitcount', // Membuat CSS Variable untuk digunakan di Tailwind
});