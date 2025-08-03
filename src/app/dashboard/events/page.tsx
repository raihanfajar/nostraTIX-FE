"use client";

import { CreateEventDialog } from "@/components/orgsidebar/create-event-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyEvents, type EventRow } from "@/mock/dummyOrganizerEvents";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const columns: ColumnDef<EventRow>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "location", header: "Location" },
  {
    accessorKey: "ticketsSold",
    header: "Tickets Sold",
    cell: ({ getValue }) => getValue<number>().toLocaleString(),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ getValue }) => `Rp ${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<EventRow["status"]>();
      const color =
        status === "ACTIVE"
          ? "bg-green-600"
          : status === "ONGOING"
            ? "bg-yellow-600"
            : status === "ENDED"
              ? "bg-blue-600"
              : "bg-red-600";
      return <Badge className={color}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View Attendees</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function EventsPage() {
  const [data] = useState(() => dummyEvents);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Events</h1>
        <CreateEventDialog />
      </div>

      <div className="rounded-md border border-[#2D4C51] bg-[#173236]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
