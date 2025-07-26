"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { DropdownMenu } from "./DropDownMenuNavbar"; // Pastikan path ini benar

const Navbar = () => {
  const pathname = usePathname();

  // Kondisi untuk menampilkan tombol: tampilkan jika BUKAN halaman login ATAU register
  const showAuthButtons = pathname !== "/login" && pathname !== "/register";

  const handleScrollToTop = (e: any) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

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

          {/* Tampilkan tombol hanya jika kondisi terpenuhi */}
          {showAuthButtons && (
            <>
              {/* Menu untuk Desktop */}
              <div className="hidden items-center justify-evenly gap-3 md:flex">
                <Link href="/login">
                  <div className="flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                    Login
                  </div>
                </Link>
                <Link href="/register">
                  <div className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                    Register
                  </div>
                </Link>
              </div>

              {/* Menu untuk Mobile */}
              <DropdownMenu />
            </>
          )}
        </div>
        <div className="animate-gradient-nav top-0 left-0 h-[3px] w-full" />
      </div>
    </nav>
  );
};

export default Navbar;
