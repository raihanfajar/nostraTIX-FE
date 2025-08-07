"use client";
import AuthProvider from "@/providers/AuthProviders";
import { getEventBySlug } from "@/services/getEvents";
import { useAuthStore } from "@/store/useAuthStore";
import { EventWithDetails } from "@/types/event";
import { axiosInstance } from "@/utils/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const Transactions = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { balancePoint, accessToken } = useAuthStore();
  const router = useRouter();

  const resolvedParams = use(params);
  const [event, setEvent] = useState<EventWithDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [voucherCode, setVoucherCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [statusVoucher, setStatusVoucher] = useState<
    null | "valid" | "invalid"
  >(null);
  const [statusCoupon, setStatusCoupon] = useState<null | "valid" | "invalid">(
    null,
  );

  const [voucherDiscountValue, setVoucherDiscountValue] = useState<number>(0);
  const [couponDiscountValue, setCouponDiscountValue] = useState<number>(0);
  const [voucherDiscountText, setVoucherDiscountText] = useState<string | null>(
    null,
  );
  const [couponDiscountText, setCouponDiscountText] = useState<string | null>(
    null,
  );

  const [selectedTicketId, setSelectedTicketId] = useState<
    string | number | null
  >(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [point, setPoint] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  interface Voucher {
    code: string;
    eventId: string;
    discount: number;
    quota: number;
    maxDiscount: number;
    expiredDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  // Fetch Event & Check voucher/coupon
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const eventData = await getEventBySlug(resolvedParams.slug);
        if (!eventData) throw new Error("Event not found");
        setEvent(eventData);

        timeout = setTimeout(async () => {
          try {
            if (voucherCode.trim()) {
              const res = await axiosInstance.get<Voucher>(
                `/transaction/voucher/check?code=${voucherCode}`,
              );
              if (res.status >= 200 && res.status < 300) {
                setStatusVoucher("valid");

                const ticket = eventData.ticketCategories.find(
                  (t) => t.id === selectedTicketId,
                );
                if (ticket) {
                  const initialTotalPrice = ticket.price * quantity;
                  let discountValue =
                    (res.data.discount / 100) * initialTotalPrice;

                  if (discountValue >= res.data.maxDiscount) {
                    discountValue = res.data.maxDiscount;
                  }

                  setVoucherDiscountValue(discountValue);
                  setVoucherDiscountText(
                    `Voucher valid get Rp.${discountValue.toLocaleString("id-ID")} off`,
                  );
                }
              }
            } else {
              setStatusVoucher(null);
              setVoucherDiscountValue(0);
              setVoucherDiscountText(null);
            }

            if (couponCode.trim()) {
              const res = await axiosInstance.get<Voucher>(
                `/transaction/coupon/check?code=${couponCode}`,
              );
              if (res.status >= 200 && res.status < 300) {
                setStatusCoupon("valid");

                const ticket = eventData.ticketCategories.find(
                  (t) => t.id === selectedTicketId,
                );
                if (ticket) {
                  const initialTotalPrice = ticket.price * quantity;
                  let discountValue =
                    (res.data.discount / 100) * initialTotalPrice;

                  if (discountValue >= res.data.maxDiscount) {
                    discountValue = res.data.maxDiscount;
                  }

                  setCouponDiscountValue(discountValue);
                  setCouponDiscountText(
                    `Coupon valid get Rp.${discountValue.toLocaleString("id-ID")} off`,
                  );
                }
              }
            } else {
              setStatusCoupon(null);
              setCouponDiscountValue(0);
              setCouponDiscountText(null);
            }
          } catch {
            if (voucherCode.trim()) setStatusVoucher("invalid");
            if (couponCode.trim()) setStatusCoupon("invalid");
          }
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch event");
      }
    };

    fetchData();
    return () => clearTimeout(timeout);
  }, [
    resolvedParams.slug,
    voucherCode,
    couponCode,
    quantity,
    selectedTicketId,
  ]);

  // Hitung total price
  useEffect(() => {
    if (!event || !selectedTicketId) {
      setTotalPrice(0);
      return;
    }
    const ticket = event.ticketCategories.find(
      (t) => t.id === selectedTicketId,
    );
    if (ticket) {
      let price = ticket.price * quantity;
      price -= voucherDiscountValue;
      price -= couponDiscountValue;
      price = Math.max(0, price - point);
      setTotalPrice(price);
    }
  }, [
    event,
    selectedTicketId,
    quantity,
    point,
    voucherDiscountValue,
    couponDiscountValue,
  ]);

  const handleSubmit = async () => {
    if (!selectedTicketId || !event) return;
    setIsLoading(true);

    try {
      const res = await axiosInstance.post<{
        message: string;
        data: { id: string };
      }>(
        // Argumen ke-1: URL
        `/transaction/create`,

        // Argumen ke-2: Data (body)
        {
          eventId: event.id,
          voucherCode: voucherCode || undefined,
          couponCode: couponCode || undefined,
          quantity,
          ticketEventCategoryId: selectedTicketId,
          point: point > 0 ? point : undefined,
        },

        // Argumen ke-3: Konfigurasi (termasuk headers)
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const transactionId = res.data.data.id;
      // router.push(`/dashboard-user/paymentproof/${transactionId}`);
      router.push(`/dashboard-user/transactions`);
    } catch (err) {
      console.error("Gagal membuat transaksi", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <AuthProvider>
      <section className="container mx-auto my-10 min-h-screen px-4">
        <div className="w-full rounded-xl border-2 border-[#2D4C51] bg-[#224046] p-5 shadow-sm">
          {/* Header */}
          <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:gap-10">
            <div className="w-full space-y-4 md:w-2/3">
              <div className="text-2xl text-[#F5DFAD] sm:text-3xl">
                {event?.name}
              </div>
              <div className="text-base text-[#DDDEDF] sm:text-lg md:text-xl">
                {event?.description}
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="relative h-40 w-full sm:h-60 md:h-80">
                <Image
                  src={event?.pictures?.[0]?.picture1 ?? "/placeholder.jpg"}
                  alt="Image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* Ticket Selection */}
          <div className="mt-6 space-y-4">
            {event?.ticketCategories.map((ticket) => {
              const isSelected = selectedTicketId === ticket.id;
              return (
                <div
                  key={ticket.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-900/30"
                      : "border-gray-600"
                  }`}
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-[#DDDEDF]">
                      {ticket.name}
                    </div>
                    <div className="text-[#DDDEDF]">{ticket.description}</div>
                    <div className="text-[#DDDEDF]">
                      Seat Available: {ticket.seatQuota}
                    </div>
                  </div>
                  <div className="text-[#DDDEDF]">
                    {ticket.price === 0
                      ? "Free"
                      : ticket.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quantity Selector */}
          {selectedTicketId && (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                -
              </button>
              <span className="text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                className="rounded bg-green-500 px-3 py-1 text-white"
              >
                +
              </button>
            </div>
          )}

          {/* Voucher & Coupon */}
          <div className="mt-6 flex flex-col gap-5 md:flex-row">
            <div className="max-w-sm">
              <input
                type="text"
                placeholder="Masukkan voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full rounded border p-2"
              />
              {statusVoucher === "invalid" && (
                <p className="text-sm text-red-400">Voucher tidak ditemukan</p>
              )}
              {statusVoucher === "valid" && voucherDiscountText && (
                <p className="text-sm text-green-400">{voucherDiscountText}</p>
              )}
            </div>

            <div className="max-w-sm">
              <input
                type="text"
                placeholder="Masukkan coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full rounded border p-2"
              />
              {statusCoupon === "invalid" && (
                <p className="text-sm text-red-400">Coupon tidak ditemukan</p>
              )}
              {statusCoupon === "valid" && couponDiscountText && (
                <p className="text-sm text-green-400">{couponDiscountText}</p>
              )}
            </div>
          </div>

          {/* Gunakan Point */}
          <div className="mt-6">
            <label className="mb-2 block text-[#F5DFAD]">
              Gunakan Point (Max 50.000, saldo: {balancePoint})
            </label>
            <button
              onClick={() => {
                if (point > 0) {
                  setPoint(0);
                } else {
                  setPoint(
                    (balancePoint ?? 0) >= 50000 ? 50000 : (balancePoint ?? 0),
                  );
                }
              }}
              className={`font-bitcount flex h-10 w-48 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046] ${
                point > 0 ? "bg-green-600 text-white" : "bg-gray-500 text-white"
              }`}
            >
              {point > 0
                ? `Menggunakan ${point.toLocaleString("id-ID")} Point`
                : "Gunakan Point"}
            </button>
          </div>

          {/* Total Price */}
          <div className="mt-6 text-lg font-bold text-[#F5DFAD]">
            Total:{" "}
            {totalPrice.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !Boolean(selectedTicketId) ||
              (statusVoucher === "invalid" && Boolean(voucherCode)) ||
              (statusCoupon === "invalid" && Boolean(couponCode))
            }
            className="font-bitcount flex h-10 w-48 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]"
          >
            {isLoading ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </div>
      </section>
    </AuthProvider>
  );
};

export default Transactions;
