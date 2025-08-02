import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Category } from "@/types/event";

const CategoryDropdown = ({
  categories,
  selectedCategories,
  toggleCategory,
}: {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-sm" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-[#F5DFAD] bg-[#224046] px-4 py-2 text-[#F5DFAD]"
      >
        <span>
          {selectedCategories.length > 0
            ? selectedCategories.join(", ")
            : "Select categories"}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[#F5DFAD]/50 bg-[#224046] p-3 shadow-lg">
          <div className="flex flex-col gap-2 text-[#F5DFAD]">
            {(categories || []).map((cat) => (
              <label key={cat.category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat.category}
                  checked={selectedCategories.includes(cat.category)}
                  onChange={() => toggleCategory(cat.category)}
                  className="accent-[#F5DFAD]"
                />
                <span>{cat.category}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
