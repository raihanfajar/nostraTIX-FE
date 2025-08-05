"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { getCityByCountryId } from "@/services/getCountry";
import { City } from "@/types/location";
import { cn } from "@/lib/utils";

type CityComboboxProps = {
  countryId?: number;
  value?: number;
  onChange: (id: number) => void;
  disabled?: boolean;
};

export const CityCombobox = ({
  countryId,
  value,
  onChange,
  disabled = false,
}: CityComboboxProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!countryId) return setCities([]);

    const fetchCities = async () => {
      try {
        const data = await getCityByCountryId(countryId);
        if (Array.isArray(data)) setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [countryId]);

  const selectedCityName =
    cities.find((city) => city.id === value)?.name ?? "Select city...";

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
        <span className={value ? "" : "text-gray-400"}>{selectedCityName}</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#F5DFAD]" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border-2 border-[#F5DFAD] bg-[#224046]/80 text-sm shadow-lg backdrop-blur">
          {cities.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No cities found.</div>
          ) : (
            cities.map((city) => (
              <div
                key={city.id}
                onClick={() => {
                  onChange(city.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex cursor-pointer items-center px-3 py-2 hover:bg-[#F5DFAD]/20",
                  value === city.id && "bg-[#F5DFAD]/30"
                )}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-[#F5DFAD]",
                    value === city.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="text-[#F5DFAD]">{city.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
