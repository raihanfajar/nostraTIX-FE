"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { DropdownMenu } from "./DropdownMenuNavbar";

const Navbar = () => {
  const pathname = usePathname();

  // 1. Kondisi utama untuk menampilkan atau menyembunyikan seluruh navbar
  const showNavbar =
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/login/organizer" &&
    pathname !== "/register/organizer" &&
    !pathname.includes("/dashboard"); // !Learn how to exclude slug, ghazi did it like this, is it the best method?

  // 2. Jika kondisi tidak terpenuhi, render "tidak ada apa-apa"
  if (!showNavbar) {
    return null;
  }

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // 3. Karena seluruh komponen sudah kondisional, kita tidak perlu lagi
  //    kondisi di dalam JSX
  return (
    <nav className="sticky top-3 z-50 container mx-auto w-full px-5">
      <div className="my-3 rounded-lg bg-[#224046]/50 backdrop-blur-sm">
        <div className="animate-gradient-nav top-0 left-0 h-[3px] w-full" />
        <div className="my-3 flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" onClick={handleScrollToTop}>
            <Image
              src="/NostraTixLogo.png"
              width={200}
              height={150}
              alt="Logo"
            />
          </Link>

          {/* Menu Desktop & Mobile (selalu tampil jika navbar tampil) */}
          <div className="hidden items-center justify-evenly gap-3 md:flex">
            <Link href="/login">
              <div className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                Login
              </div>
            </Link>
            <Link href="/register">
              <div className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                Register
              </div>
            </Link>
          </div>
          <DropdownMenu />
        </div>
        <div className="animate-gradient-nav top-0 left-0 h-[3px] w-full" />
      </div>
    </nav>
  );
};

export default Navbar;
