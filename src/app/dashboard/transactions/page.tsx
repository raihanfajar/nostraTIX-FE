"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { WaitingConfirmationResponse } from "@/types/event";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Transaction {
  id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  event: {
    name: string;
    startDate: string;
  };
  user: {
    name: string;
    email: string;
  };
  TicketEventCategory: {
    name: string;
    price: number;
  };
}

export default function WaitingConfirmationPage() {
  const { accessToken } = useAuthStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get<WaitingConfirmationResponse>(
        "/transaction/waiting-confirmation",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      setTransactions(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  const handleUpdateStatus = async (
    transactionId: string,
    status: "DONE" | "REJECTED",
  ) => {
    try {
      setLoading(true);
      await axiosInstance.patch(
        `/transaction/status/${transactionId}`,
        { status },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      toast.success(`Transaction status updated to ${status}`);
      fetchTransactions();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update transaction status");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-dots loading-3xl text-[#F5DFAD]" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer position="top-right" />
      <h1 className="mb-4 text-2xl font-bold text-[#F5DFAD]">
        Waiting for Confirmation
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-[#173236] text-[#F5DFAD]">
            <tr>
              <th className="border p-2">Event</th>
              <th className="border p-2">Buyer</th>
              <th className="border p-2">Ticket</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id}>
                <td className="border p-2">{trx.event.name}</td>
                <td className="border p-2">
                  {trx.user.name} <br />
                  <span className="text-xs text-[#DDDEDF]">
                    {trx.user.email}
                  </span>
                </td>
                <td className="border p-2">{trx.TicketEventCategory.name}</td>
                <td className="border p-2">{trx.quantity}</td>
                <td className="border p-2">
                  {trx.totalPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="flex justify-center gap-2 border p-2">
                  <button
                    disabled={loading}
                    onClick={() => handleUpdateStatus(trx.id, "DONE")}
                    className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleUpdateStatus(trx.id, "REJECTED")}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No transactions are currently waiting for confirmation
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
