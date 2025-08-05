"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateEventDialog } from "@/components/orgsidebar/create-event-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

// 🧠 1. Define the type (copy from backend)
type EventRowReal = {
  id: string;
  name: string;
  category: string;
  country: string;
  city: string;
  location: string;
  ticketsSold: number;
  revenue: number;
  startDate: string;
  endDate: string;
};

type EventsSummaryResponse = {
  result: {
    status: string;
    message: string;
    data: EventRowReal[];
  };
};

const accessToken = useAuthStore.getState().accessToken;

// 📡 2. Fetch data using react-query
const getEventsSummary = async (): Promise<EventRowReal[]> => {
  const res = await axiosInstance.get<EventsSummaryResponse>(
    "organizer/events/events-summary",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return res.data.result.data;
};

const useEventsSummary = () =>
  useQuery({
    queryKey: ["organizer-events-summary"],
    queryFn: getEventsSummary,
  });

// 📊 3. Table column definitions
const columns: ColumnDef<EventRowReal>[] = [
  // { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Title" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "startDate",
    header: "Start",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "endDate",
    header: "End",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString("id-ID"),
  },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "location", header: "Location Detail" },
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
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// 🚀 4. Page Component
export default function EventsPage() {
  const { data = [], isLoading } = useEventsSummary();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-6 text-white">Loading events...</div>;
  }

  return (
    <div className="p-6 text-white zoom-out-85">
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
