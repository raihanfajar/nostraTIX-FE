"use client";

import { useState, useRef } from "react";
import { Menu, X, Moon, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook ini sekarang akan bekerja dengan benar karena komponen ini terpisah
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative md:hidden" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#F5DFAD]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 origin-top-right rounded-xl bg-[#224046] p-4 text-[#F5DFAD] shadow-lg">
          <div className="flex flex-col gap-2">
            {/* Bagian Bawah */}
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
          </div>
        </div>
      )}
    </div>
  );
};
