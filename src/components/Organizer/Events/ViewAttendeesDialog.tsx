"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

type Attendee = {
  ticketId: string;
  attendeeId: string;
  name: string;
  email: string;
  category: string;
  eventDate: string;
  paidAmount: number;
};

type Props = {
  eventId: string;
  children: React.ReactNode;
};

type AttendeeResponse = {
  result: {
    status: string;
    message: string;
    data: Attendee[];
  };
};

const { accessToken } = useAuthStore.getState();

const fetchAttendees = async (eventId: string): Promise<Attendee[]> => {
  console.log("Fetching attendees for event:", eventId);
  const res = await axiosInstance.get<AttendeeResponse>(
    `organizer/events/${eventId}/attendees`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data.result.data;
};

export default function ViewAttendeesDialog({ eventId, children }: Props) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendees", eventId],
    queryFn: () => fetchAttendees(eventId),
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-[#173236] text-white">
        <DialogHeader>
          <DialogTitle>Attendees</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Loading attendees...</p>}
        {isError && <p>Failed to load attendees.</p>}
        {!isLoading && data?.length === 0 && <p>No attendees found.</p>}

        {!isLoading && data && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2D4C51] text-left text-[#E67F3C]">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Ticket</th>
                <th className="py-2 pr-4">Event Date</th>
                <th className="py-2">Paid</th>
              </tr>
            </thead>
            <tbody>
              {data.map((attendee) => (
                <tr
                  key={attendee.ticketId}
                  className="border-b border-[#2D4C51]"
                >
                  <td className="py-2 pr-4">{attendee.name}</td>
                  <td className="py-2 pr-4">{attendee.email}</td>
                  <td className="py-2 pr-4">{attendee.category}</td>
                  <td className="py-2 pr-4">
                    {dayjs(attendee.eventDate).format("DD MMM YYYY")}
                  </td>
                  <td className="py-2">
                    Rp {attendee.paidAmount.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DialogContent>
    </Dialog>
  );
}