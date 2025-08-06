"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const transactionId = resolvedParams.slug;

  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("paymentProof", file);

      await axiosInstance.post(`/transaction/payment/${transactionId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File uploaded successfully", {
        onClose: () => router.push("/"),
        autoClose: 1500,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Upload Payment Proof</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" onChange={handleFileChange} accept="image/*" />
            <Button
              onClick={handleUpload}
              className="w-full"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
