"use client";

import { useEffect, useState } from "react";
import { getCountry } from "@/services/getCountry";
import { Country } from "@/types/location";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CountryComboboxProps = {
  value?: number;
  onChange: (id: number) => void;
  disabled?: boolean;
};

export const CountryCombobox = ({
  value,
  onChange,
  disabled = false,
}: CountryComboboxProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountry();
        if (Array.isArray(data)) setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const selectedCountryName =
    countries.find((country) => country.id === value)?.name ?? "Select country...";

  return (
    <div className="relative w-full max-w-sm">
      <button
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-[#F5DFAD] bg-[#224046] px-4 py-2 text-[#F5DFAD]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className={value ? "" : "text-gray-400"}>{selectedCountryName}</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#F5DFAD]" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border-2 border-[#F5DFAD] bg-[#224046]/80 text-sm shadow-lg backdrop-blur">
          {countries.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No countries found.</div>
          ) : (
            countries.map((country) => (
              <div
                key={country.id}
                onClick={() => {
                  onChange(country.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex cursor-pointer items-center px-3 py-2 hover:bg-[#F5DFAD]/20",
                  value === country.id && "bg-[#F5DFAD]/30"
                )}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-[#F5DFAD]",
                    value === country.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="text-[#F5DFAD]">{country.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
