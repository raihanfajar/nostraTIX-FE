"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { PiPasswordDuotone, PiPasswordFill } from "react-icons/pi";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { slug } = useParams();
  const inputPassword = useRef<HTMLInputElement>(null);
  const confirmationPassword = useRef<HTMLInputElement>(null);

  const { mutate: mutationResetPassword, isPending } = useMutation({
    mutationFn: async () => {
      if (
        inputPassword?.current?.value !== confirmationPassword?.current?.value
      ) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        await axiosInstance.patch(
          `api/auth/reset-password-update`,
          { newPassword: inputPassword?.current?.value, targetRole: "USER" },
          {
            headers: { Authorization: `Bearer ${slug}` },
          },
        );
        toast.success("Password updated");
        router.push("/login");
      } catch (error) {
        console.log(error);
        toast.error("Failed to reset password");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex min-h-screen items-center justify-center bg-[#17326] p-4"
    >
      <Card className="w-full max-w-md border-[#2D4C51] bg-[#22406] text-[#F5DFAD] shadow-lg">
        {/* Header */}
        <CardHeader>
          <CardTitle className="font-anton text-2xl text-[#F5DFAD]">
            Reset Password
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {/* New Password */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#2D4C51] bg-[#17326] px-4 py-3">
            <PiPasswordDuotone className="text-2xl text-[#E67F3C]" />
            <input
              type="password"
              ref={inputPassword}
              placeholder="Type new password"
              className="font-lato w-full bg-transparent text-[#DDDEDF] placeholder:text-[#DDDEDF] focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#2D4C51] bg-[#17326] px-4 py-3">
            <PiPasswordFill className="text-2xl text-[#E67F3C]" />
            <input
              type="password"
              ref={confirmationPassword}
              placeholder="Type confirmation password"
              className="font-lato w-full bg-transparent text-[#DDDEDF] placeholder:text-[#DDDEDF] focus:outline-none"
            />
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter>
          <Button
            type="submit"
            onClick={() => {
              mutationResetPassword();
            }}
            disabled={isPending}
            className="font-bitcount w-full rounded-md bg-[#E67F3C] py-2 font-bold tracking-wide text-white transition hover:bg-[#2E5A61] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Submit New Password
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
