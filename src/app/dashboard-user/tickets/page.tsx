"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Ticket {
  id: string;
  eventName: string;
  nameCategory: string;
  eventDate: string;
  qrCode: string;
  transaction: {
    status: string;
    quantity: number;
  };
}

export default function TicketsDashboard() {
  const { accessToken } = useAuthStore();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<Ticket[]>("/transaction/ticket", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchTickets();
    }
  }, [accessToken]);

  if (loading) {
    return <div className="p-6 text-white">Loading tickets...</div>;
  }

  return (
    <div className="p-6" style={{ backgroundColor: "#173236" }}>
      <h1 className="mb-4 text-2xl font-bold" style={{ color: "#F5DFAD" }}>
        My Tickets
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#2D4C51]">
          <thead>
            <tr style={{ color: "#F5DFAD" }}>
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Qty</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody style={{ color: "#DDDEDF" }}>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="border-t border-[#2D4C51]">
                  <td className="px-4 py-2">{ticket.eventName}</td>
                  <td className="px-4 py-2">{ticket.nameCategory}</td>
                  <td className="px-4 py-2">
                    {new Date(ticket.eventDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-2">{ticket.transaction.quantity}</td>
                  <td className="px-4 py-2">{ticket.transaction.status}</td>
                  <td className="px-4 py-2">
                    <Button
                      className="border border-[#2D4C51] bg-[#224046] text-[#F5DFAD] hover:bg-[#2E5A61]"
                      onClick={() => setSelectedQR(ticket.qrCode)}
                    >
                      View QR Code
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center"
                  style={{ color: "#DDDEDF" }}
                >
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={!!selectedQR} onOpenChange={() => setSelectedQR(null)}>
        <DialogContent className="bg-[#173236] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#F5DFAD]">Ticket QR Code</DialogTitle>
          </DialogHeader>
          {selectedQR && (
            <div className="flex justify-center p-4">
              <Image
                src={selectedQR}
                alt="QR Code"
                width={300}
                height={300}
                className="h-auto max-w-xs"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
