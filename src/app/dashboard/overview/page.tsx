"use client";

import { Home, DollarSign, Ticket, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockStats = [
  { label: "Total Events", value: 3, icon: Home },
  { label: "Revenue", value: "Rp 4.500.000", icon: DollarSign },
  { label: "Tickets Sold", value: 187, icon: Ticket },
  { label: "Active Coupons", value: 12, icon: TrendingUp },
];

const mockChart = [
  { month: "Jan", revenue: 800_000 },
  { month: "Feb", revenue: 1_200_000 },
  { month: "Mar", revenue: 2_200_000 },
  { month: "Apr", revenue: 3_200_000 },
  { month: "May", revenue: 4_200_000 },
  { month: "Jun", revenue: 5_200_000 },
  { month: "Jul", revenue: 6_200_000 },
  { month: "Aug", revenue: 7_200_000 },
  { month: "Sep", revenue: 8_200_000 },
  { month: "Oct", revenue: 9_200_000 },
  { month: "Nov", revenue: 10_200_000 },
  { month: "Dec", revenue: 11_200_000 },
];

export default function OverviewPage() {
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

      {/* Tiny revenue chart */}
      <Card className="border-[#2D4C51] bg-[#173236]">
        <CardHeader>
          <CardTitle className="text-[#E67F3C]">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockChart}
              margin={{ top: 5, right: 5, bottom: 5, left: 30 }}
            >
              <XAxis dataKey="month" stroke="white" />
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
        </CardContent>
      </Card>
    </div>
  );
}
