"use client";

import React, { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { CountryCombobox } from "./CountryComboBox";
import { CityCombobox } from "./CityComboBox";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { getEventCategories } from "@/services/getEvents";
import { Category } from "@/types/event";
import CategoryDropdown from "./CategoriesBox";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category") || [],
  );

  const [name, setName] = useState(searchParams.get("name") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [selectedCountry, setSelectedCountry] = useState(
    searchParams.get("countryId") || "",
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("cityId") || "",
  );

  const debouncedName = useDebounce(name, 1000);
  const debouncedLocation = useDebounce(location, 1000);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getEventCategories();
        console.log("Fetched categories:", result);
        setCategories(result || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedName) params.set("name", debouncedName);
    if (debouncedLocation) params.set("location", debouncedLocation);
    if (selectedCountry) params.set("countryId", selectedCountry);
    if (selectedCity) params.set("cityId", selectedCity);
    selectedCategories.forEach((cat) => params.append("category", cat));

    router.push(`${pathname}?${params.toString()}`);
  }, [
    debouncedName,
    debouncedLocation,
    selectedCountry,
    selectedCity,
    selectedCategories,
    pathname,
    router,
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="mt-10 px-5">
      <div className="grid w-full gap-4 rounded-3xl border-2 border-[#F5DFAD] bg-[#224046]/50 p-5 md:grid-cols-3  2xl:grid-cols-5">
        {/* Search */}
        <div className="flex items-center gap-1 max-w-sm">
          <Search className="mr-1 text-[#F5DFAD]" />
          <input
            type="text"
            value={name}
            placeholder="Input event name..."
            onChange={(e) => setName(e.target.value)}
            className="w-full  border-b border-[#F5DFAD] bg-transparent p-1 text-[#F5DFAD] outline-none placeholder:text-gray-400 "
          />
        </div>

        {/* Category */}
        <CategoryDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />

        {/* Country */}
        <CountryCombobox
          value={Number(selectedCountry) || undefined}
          onChange={(id) => {
            setSelectedCountry(String(id));
            setSelectedCity("");
          }}
        />

        {/* City */}
        <CityCombobox
          countryId={Number(selectedCountry) || undefined}
          value={Number(selectedCity) || undefined}
          onChange={(id) => setSelectedCity(String(id))}
          disabled={!selectedCountry}
        />

        {/* Location */}
        <div className="flex items-center gap-1 max-w-sm">
          <MapPin className="mr-1 text-[#F5DFAD]" />
          <input
            type="text"
            value={location}
            placeholder="Input location name..."
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-b border-[#F5DFAD] bg-transparent p-1 text-[#F5DFAD] outline-none placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
