"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  // 1. Kondisi utama untuk menampilkan atau menyembunyikan seluruh navbar
  const showNavbar =
    pathname !== "/login" &&
    pathname !== "/register" &&
    !pathname.includes("/dashboard"); // !Excluding dashboard (ghazi)

  // 2. Jika kondisi tidak terpenuhi, render "tidak ada apa-apa"
  if (!showNavbar) {
    return null;
  }
  return (
    <footer className="footer sm:footer-horizontal text-neutral-content border-t border-[#F5DFAD] bg-[#224046]/50 py-10">
      <div className="flex h-10 w-full items-center justify-center">
        <div className="animate-gradient-y h-[2px] w-full" />
        <Image
          src="/NostraTixLogo.png"
          width={200}
          height={150}
          alt="Logo"
          sizes="(max-width: 640px) 160px, 160px"
          className="h-auto"
        />

        <div className="animate-gradient-y h-[2px] w-full" />
      </div>
    </footer>
  );
};

export default Footer;
