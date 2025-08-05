"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const mockStats = [
  { label: "Total Events", value: 3, icon: Home },
  { label: "Revenue", value: "Rp 4.500.000", icon: DollarSign },
  { label: "Tickets Sold", value: 187, icon: Ticket },
  { label: "Active Coupons", value: 12, icon: TrendingUp },
];

// const revenueData = {
//   daily: [
//     { date: "1 Aug", revenue: 500_000 },
//     { date: "2 Aug", revenue: 650_000 },
//     { date: "3 Aug", revenue: 700_000 },
//   ],
//   monthly: [
//     { date: "Jan", revenue: 800_000 },
//     { date: "Feb", revenue: 1_200_000 },
//     { date: "Mar", revenue: 2_200_000 },
//     { date: "Apr", revenue: 3_200_000 },
//     { date: "May", revenue: 4_200_000 },
//     { date: "Jun", revenue: 5_200_000 },
//     { date: "Jul", revenue: 6_200_000 },
//     { date: "Aug", revenue: 7_200_000 },
//   ],
//   yearly: [
//     { date: "2021", revenue: 12_000_000 },
//     { date: "2022", revenue: 18_000_000 },
//     { date: "2023", revenue: 25_000_000 },
//   ],
// };

const fetchRevenueOverview = async (view: "daily" | "monthly" | "yearly") => {
  const res = await axios.get<RevenueOverviewResponse>(
    `/organizer/revenue-overview?view=${view}`,
  );
  return res.data.result.data;
};

export default function OverviewPage() {
  const [selectedView, setSelectedView] = useState<
    "daily" | "monthly" | "yearly"
  >("monthly");

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["revenueOverview", selectedView],
    queryFn: () => fetchRevenueOverview(selectedView),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex flex-col gap-6 p-6 text-white">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((s) => (
          <Card key={s.label} className="border-[#2D4C51] bg-[#173236]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {s.label}
              </CardTitle>
              <s.icon className="h-4 w-4 text-[#E67F3C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{s.value}</div>
            </CardContent>
          </Card>
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
