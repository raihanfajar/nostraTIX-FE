"use client";

<<<<<<< HEAD
import ViewAttendeesDialog from "@/components/Organizer/Events/ViewAttendeesDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
=======
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
>>>>>>> main
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
<<<<<<< HEAD
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// 🧠 Type
type EventRowReal = {
  id: string;
  name: string;
  description: string;
=======
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
>>>>>>> main
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

<<<<<<< HEAD
=======
// 📡 2. Fetch data using react-query
>>>>>>> main
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
<<<<<<< HEAD
=======

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
>>>>>>> main

// 🚀 4. Page Component
export default function EventsPage() {
<<<<<<< HEAD
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<EventRowReal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const router = useRouter();
  const { data = [], isPending } = useEventsSummary();
  const queryClient = useQueryClient();

  const { mutate: handleDeleteEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const res = await axiosInstance.delete(
        `organizer/events/delete/${eventId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["organizer-events-summary"] });
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });

  const { mutate: handleEditEvent } = useMutation({
    mutationFn: async () => {
      if (!editData) return;

      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      console.log("Sending payload:", payload);

      const res = await axiosInstance.patch(
        `organizer/events/edit/${editData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Event updated successfully");
      setIsEditOpen(false);
      queryClient.invalidateQueries({ queryKey: ["organizer-events-summary"] });
    },
    onError: () => {
      toast.error("Failed to update event");
    },
  });

  const columns: ColumnDef<EventRowReal>[] = [
    { accessorKey: "id", header: "ID" },
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
      cell: ({ row }) => {
        const eventId = row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setEditData(row.original);
                  setFormData({
                    name: row.original.name,
                    category: row.original.category,
                    location: row.original.location,
                    startDate: row.original.startDate.split("T")[0],
                    endDate: row.original.endDate.split("T")[0],
                  });
                  setIsEditOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>

              <ViewAttendeesDialog eventId={eventId}>
                <DropdownMenuItem>View Attendees</DropdownMenuItem>
              </ViewAttendeesDialog>

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this event?")) {
                    handleDeleteEvent(eventId);
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
=======
  const { data = [], isLoading } = useEventsSummary();
>>>>>>> main

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

<<<<<<< HEAD
  if (isPending) {
=======
  if (isLoading) {
>>>>>>> main
    return <div className="p-6 text-white">Loading events...</div>;
  }

  return (
<<<<<<< HEAD
    <div className="zoom-out-85 p-6 text-white">
=======
    <div className="p-6 text-white zoom-out-85">
>>>>>>> main
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Events</h1>
        <Button
          className="font-bitcount rounded-md bg-[#E67F3C] py-2 font-bold tracking-wide text-white transition hover:bg-[#2E5A61]"
          variant="default"
          type="button"
          onClick={() => router.push("/dashboard/events/create")}
        >
          Create Event
        </Button>
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

      {/* ✨ Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#173236] text-white">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Event Name</label>
              <Input
                placeholder="Event Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button
              className="bg-[#E67F3C] hover:bg-[#2E5A61]"
              onClick={() => handleEditEvent()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
