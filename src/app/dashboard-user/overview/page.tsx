"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Home, Ticket, TrendingUp } from "lucide-react";

type UserOverviewResponse = {
  result: {
    status: string;
    message: string;
    data: {
      totalEventsAttended: number;
      totalTicketsBought: number;
      activeVoucherCount: number;
    };
  };
};

export default function OverviewPage() {
  const { accessToken } = useAuthStore();

  const fetchOverview = async () => {
    const res = await axiosInstance.get<UserOverviewResponse>(
      "user/overview", 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return res.data.result.data;
  };

  const { data: overviewData } = useQuery({
    queryKey: ["userOverview"],
    queryFn: fetchOverview,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex flex-col gap-6 p-6 text-white">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData
          ? [
              {
                label: "Event Attended",
                value: overviewData.totalEventsAttended,
                icon: Home,
              },
              {
                label: "Tickets Bought",
                value: overviewData.totalTicketsBought,
                icon: Ticket,
              },
              {
                label: "Active Vouchers",
                value: overviewData.activeVoucherCount,
                icon: TrendingUp,
              },
            ].map((s) => (
              <Card key={s.label} className="border-[#2D4C51] bg-[#173236]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white">
                    {s.label}
                  </CardTitle>
                  <s.icon className="h-4 w-4 text-[#E67F3C]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">
                    {s.value}
                  </div>
                </CardContent>
              </Card>
            ))
          : Array.from({ length: 4 }).map((_, idx) => (
              <Card
                key={idx}
                className="h-[100px] border-[#2D4C51] bg-[#173236]"
              />
            ))}
      </div>
    </div>
  );
}
