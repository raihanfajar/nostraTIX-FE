"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { DropdownMenu } from "./DropdownMenuNavbar";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  /* 1. ALL hooks first, unconditionally */
  const pathname = usePathname();
  const { name } = useAuthStore();
  const { clearAuth } = useAuthStore();
  const isUserLoggedIn = useAuthStore((state) => !!state.accessToken);

  /* 2. Early-return (after hooks) */
  const showNavbar =
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/login/organizer" &&
    pathname !== "/register/organizer" &&
    !pathname.includes("/dashboard") &&
    !pathname.includes("/reset-password");

  if (!showNavbar) return null;

  /* 3. Scroll helper */
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* 4. Render */
  return (
    <nav className="sticky top-3 z-50 container mx-auto w-full px-5">
      <div className="my-3 rounded-lg bg-[#224046]/50 backdrop-blur-sm">
        <div className="animate-gradient-nav h-[3px] w-full" />
        <div className="my-3 flex items-center justify-between px-4">
          <Link href="/" onClick={handleScrollToTop}>
            <Image
              src="/NostraTixLogo.png"
              width={200}
              height={150}
              alt="Logo"
            />
          </Link>

          {!isUserLoggedIn ? (
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
          ) : (
            <div className="hidden items-center justify-evenly gap-3 md:flex">
              <div className="mr-5 text-xl text-[#F5DFAD]">Hi, {name}</div>
              <Link href="/dashboard-user/overview">
                <div className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                  Dashboard
                </div>
              </Link>
              <Link
                href="/login"
                onClick={() => {
                  clearAuth();
                  window.location.href = "/login";
                }}
              >
                <div className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                  Sign Out
                </div>
              </Link>
            </div>
          )}

          <DropdownMenu />
        </div>
        <div className="animate-gradient-nav h-[3px] w-full" />
      </div>
    </nav>
  );
};

export default Navbar;
