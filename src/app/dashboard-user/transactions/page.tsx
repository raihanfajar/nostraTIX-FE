"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

interface Transaction {
  id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  event: {
    id: string;
    name: string;
  };
}

export default function TransactionsDashboard() {
  const { accessToken, id } = useAuthStore();
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [waitingTransactions, setWaitingTransactions] = useState<Transaction[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  // State untuk dialog upload
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, waitingRes] = await Promise.all([
          axiosInstance.get<Transaction[]>(`/events/user/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axiosInstance.get<Transaction[]>(`/events/user/waiting/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);
        setAllTransactions(allRes.data);
        setWaitingTransactions(waitingRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, accessToken]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedTransactionId) {
      toast.error("Please select a file first");
      return;
    }
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("paymentProof", file);

      await axiosInstance.post(
        `/transaction/payment/${selectedTransactionId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("File uploaded successfully");
      setUploadDialogOpen(false);
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-10 p-6" style={{ backgroundColor: "#173236" }}>
      <ToastContainer position="top-right" />

      {/* Semua Transaksi */}
      <section>
        <h2 className="mb-4 text-xl font-bold" style={{ color: "#F5DFAD" }}>
          All Transactions
        </h2>
        <div className="overflow-x-auto rounded border border-gray-600">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ color: "#F5DFAD" }}>ID</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Event</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Quantity</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Total Price</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Status</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell style={{ color: "#DDDEDF" }}>{tx.id}</TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {tx.event.name}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {tx.quantity}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    Rp {tx.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {tx.status}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {new Date(tx.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Waiting Payment */}
      <section>
        <h2 className="mb-4 text-xl font-bold" style={{ color: "#F5DFAD" }}>
          Waiting for Payment
        </h2>
        <div className="overflow-x-auto rounded border border-gray-600">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ color: "#F5DFAD" }}>ID</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Event</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Quantity</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Total Price</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Status</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Date</TableHead>
                <TableHead style={{ color: "#F5DFAD" }}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitingTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell style={{ color: "#DDDEDF" }}>{tx.id}</TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {tx.event.name}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {tx.quantity}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    Rp {tx.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {tx.status}
                  </TableCell>
                  <TableCell style={{ color: "#DDDEDF" }}>
                    {new Date(tx.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedTransactionId(tx.id);
                        setUploadDialogOpen(true);
                      }}
                      className="bg-[#E67F3C] hover:bg-[#2E5A61]"
                    >
                      Upload Proof
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Dialog Upload */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-[#173236] text-white">
          <DialogHeader>
            <DialogTitle>Upload Payment Proof</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-[#E67F3C] hover:bg-[#2E5A61]"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
