"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Voucher } from "@/types/event";

// 🧠 Type
type EventRowReal = {
  id: string;
  name: string;
  description: string;
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

// 🚀 4. Page Component
export default function EventsPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<EventRowReal | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const [voucherData, setVoucherData] = useState({
    code: "",
    discount: "",
    maxDiscount: "",
    quota: "",
    expiredDate: "",
  });

  const [voucherDialog, setVoucherDialog] = useState(false);
  const [voucherCatalog, setVoucherCatalog] = useState(false);
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);

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

  const { mutate: voucherEditEvent } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...voucherData,
        eventId: selectedEventId, // ✅ tambahkan eventId dari event yang sedang aktif
        expiredDate: new Date(voucherData.expiredDate).toISOString(),
      };

      console.log("Sending payload:", payload);

      const res = await axiosInstance.post(
        `/transaction/create/voucher`,
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
      toast.success("Voucher create succesfully");
      setVoucherDialog(false);
    },
    onError: () => {
      toast.error("Failed to create voucher");
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
                onClick={() => {
                  setVoucherDialog(true);
                  setSelectedEventId(eventId);
                }}
              >
                Add Voucher
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  setSelectedEventId(eventId);
                  setVoucherCatalog(true);

                  try {
                    const res = await axiosInstance.get<Voucher[]>(
                      `/transaction/voucher`,
                      {
                        params: { eventId },
                        headers: { Authorization: `Bearer ${accessToken}` },
                      },
                    );
                    setVoucherList(res.data);
                  } catch (error) {
                    console.log(error);
                    toast.error("Failed to load vouchers");
                  }
                }}
              >
                See Voucher
              </DropdownMenuItem>

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <div className="p-6 text-white">Loading events...</div>;
  }

  return (
    <div className="zoom-out-85 p-6 text-white">
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

      {/* ✨ Voucher Dialog */}
      <Dialog open={voucherDialog} onOpenChange={setVoucherDialog}>
        <DialogContent className="bg-[#173236] text-white">
          <DialogHeader>
            <DialogTitle>Add Voucher</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Voucher Code</label>
              <Input
                placeholder="Voucher Code"
                value={voucherData.code}
                onChange={(e) =>
                  setVoucherData((prev) => ({ ...prev, code: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Discount Percentage</label>
              <Input
                placeholder="Disckon Percentage"
                value={voucherData.discount}
                onChange={(e) =>
                  setVoucherData((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Max Discount</label>
              <Input
                placeholder="Max Discount"
                value={voucherData.maxDiscount}
                onChange={(e) =>
                  setVoucherData((prev) => ({
                    ...prev,
                    maxDiscount: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Qouta</label>
              <Input
                placeholder="Qouta"
                value={voucherData.quota}
                onChange={(e) =>
                  setVoucherData((prev) => ({
                    ...prev,
                    quota: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Expired Date</label>
              <Input
                type="date"
                value={voucherData.expiredDate}
                onChange={(e) =>
                  setVoucherData((prev) => ({
                    ...prev,
                    expiredDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setVoucherDialog(false)}
              className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]"
            >
              Cancel
            </Button>
            <Button
              className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]"
              onClick={() => voucherEditEvent()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✨ Voucher Dialog */}
      <Dialog open={voucherCatalog} onOpenChange={setVoucherCatalog}>
        <DialogContent className="bg-[#173236] text-white">
          <DialogHeader>
            <DialogTitle>Voucher Catalog</DialogTitle>
          </DialogHeader>

          <div>
            {voucherList.length === 0 ? (
              <p className="text-sm text-gray-400">No vouchers found</p>
            ) : (
              <ul className="list-disc pl-5">
                {voucherList.map((v: Voucher) => (
                  <li key={v.code} className="text-sm">
                    <span className="font-semibold">{v.code}</span> -{" "}
                    {v.discount}% off, max {v.maxDiscount}, quota {v.quota},
                    expires{" "}
                    {new Date(v.expiredDate).toLocaleDateString("id-ID")}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
