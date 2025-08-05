"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Home, Ticket, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueData = { date: string; revenue: number };

type RevenueOverviewResponse = {
  result: {
    status: string;
    message: string;
    data: RevenueData[];
  };
};

type OrganizerOverviewResponse = {
  result: {
    status: string;
    message: string;
    data: {
      totalEventsCreated: number;
      totalRevenue: number;
      totalTicketsSold: number;
      activeCouponsCount: number;
    };
  };
};

export default function OverviewPage() {
  const { accessToken } = useAuthStore();
  const [selectedView, setSelectedView] = useState<
    "daily" | "monthly" | "yearly"
  >("monthly");

  const fetchRevenueOverview = async (view: "daily" | "monthly" | "yearly") => {
    const res = await axiosInstance.get<RevenueOverviewResponse>(
      `organizer/profile/revenue-overview?view=${view}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return res.data.result.data;
  };

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["revenueOverview", selectedView],
    queryFn: () => fetchRevenueOverview(selectedView),
    staleTime: 1000 * 60 * 5,
  });

  const fetchOverview = async () => {
    const res = await axiosInstance.get<OrganizerOverviewResponse>(
      "organizer/profile/overview",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return res.data.result.data;
  };

  const { data: overviewData } = useQuery({
    queryKey: ["organizerOverview"],
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
                label: "Total Events",
                value: overviewData.totalEventsCreated,
                icon: Home,
              },
              {
                label: "Revenue",
                value: `Rp ${overviewData.totalRevenue.toLocaleString("id-ID")}`,
                icon: DollarSign,
              },
              {
                label: "Tickets Sold",
                value: overviewData.totalTicketsSold,
                icon: Ticket,
              },
              {
                label: "Active Coupons",
                value: overviewData.activeCouponsCount,
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

      {/* Revenue Chart with Tabs */}
      <Card className="border-[#2D4C51] bg-[#173236]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#E67F3C]">Revenue Overview</CardTitle>
          <Tabs
            value={selectedView}
            onValueChange={(val) =>
              setSelectedView(val as "daily" | "monthly" | "yearly")
            }
          >
            <TabsList className="bg-[#22406]">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 30 }}
            >
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#173236",
                  border: "1px solid #2D4C51",
                  color: "#DDDEDF",
                }}
              />
              <Bar dataKey="revenue" fill="#E67F3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {isLoading && (
            <p className="mt-2 text-sm text-gray-400">Loading chart...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
