"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PaginationSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(() => {
    const param = searchParams.get("page");
    return param ? parseInt(param) : 1;
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (page !== 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [page]);

  const totalPages = 5;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Pagination className="mb-10">
      <PaginationContent className="text-[#F5DFAD]">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            className="border-none bg-transparent text-[#F5DFAD] shadow-none ring-0 outline-none hover:bg-transparent focus:ring-0 focus:outline-none"
          />
        </PaginationItem>

        {/* Current Page Only */}
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="cursor-default border-none bg-transparent text-[#F5DFAD] shadow-none ring-0 outline-none hover:bg-transparent focus:ring-0 focus:outline-none"
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            className="border-none bg-transparent text-[#F5DFAD] shadow-none ring-0 outline-none hover:bg-transparent focus:ring-0 focus:outline-none"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
