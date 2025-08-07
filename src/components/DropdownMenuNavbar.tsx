"use client";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export const DropdownMenu = () => {
  const {name} = useAuthStore() 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ambil status login & clearAuth dari store
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isLoggedIn = !!accessToken;

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSignOut = () => {
    clearAuth();
    window.location.href = "/login";
  };

  return (
    <div className="relative md:hidden" ref={dropdownRef}>
      {/* Hamburger / Close button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#F5DFAD]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 origin-top-right rounded-xl bg-[#224046] p-4 text-[#F5DFAD] shadow-lg">
          <div className="flex flex-col gap-2">
            {/* Jika BELUM login */}
            {!isLoggedIn && (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-white/10"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-white/10"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </>
            )}

            {/* Jika SUDAH login */}
            {isLoggedIn && (
              <>
                <div className="text-[#F5DFAD] text-base p-2">Hi, {name}</div>
                <Link
                  href="/dashboard-user/overview"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-white/10"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-white/10"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
