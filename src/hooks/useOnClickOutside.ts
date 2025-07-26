import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

// Tipe data untuk parameter ref telah diperbaiki di sini
export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      
      // Logika ini sudah benar, ia akan berhenti jika klik terjadi di dalam elemen ref
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      
      // Panggil handler hanya jika klik terjadi di luar
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};