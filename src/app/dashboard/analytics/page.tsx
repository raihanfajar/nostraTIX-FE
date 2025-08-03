"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { label: "Jan", sales: 80 },
  { label: "Feb", sales: 120 },
  { label: "Mar", sales: 190 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6 text-white">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Card className="border-[#2D4C51] bg-[#173236]">
        <CardHeader>
          <CardTitle>Ticket Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="label" stroke="#DDDEDF" />
              <YAxis stroke="#DDDEDF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#173236",
                  border: "1px solid #2D4C51",
                }}
              />
              <Bar dataKey="sales" fill="#E67F3C" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
