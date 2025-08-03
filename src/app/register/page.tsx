"use client";
import AuthMainLeftSection from "@/components/AuthMainLeftSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserRegister } from "@/hooks/auth/useUserRegister";
import { axiosInstance } from "@/utils/axiosInstance";
import { registerUserVS } from "@/utils/validationSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";

const RegisterUser = () => {
  const { mutateAsync: registerUser, isPending } = useUserRegister();

  const [refCodeStatus, setRefCodeStatus] = useState<
    "NONE" | "VALID" | "INVALID"
  >("NONE");

  const [dialogOpen, setDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      refCode: "",
    },
    validationSchema: registerUserVS,
    onSubmit: async (values) => {
      await registerUser({
        name: values.fullName,
        email: values.email,
        password: values.password,
        referralCode: values.refCode,
      });
    },
  });

  // Simple referral-code check: must be alphanumeric ≥4 chars
  const applyReferralCode = async () => {
    const code = formik.values.refCode.trim();
    if (!/^[a-zA-Z0-9]{4,}$/.test(code)) {
      setRefCodeStatus("INVALID");
      return;
    }

    try {
      const { data }: { data: { result: { status: string } } } =
        await axiosInstance.post("api/auth/validate-referral-code", {
          referralCode: code,
        });

      // assuming backend returns { status: string }
      if (data?.result?.status === "success") {
        setRefCodeStatus("VALID");
      } else {
        setRefCodeStatus("INVALID");
      }
    } catch {
      setRefCodeStatus("INVALID");
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <main className="flex min-h-screen overflow-hidden bg-[#173236] text-[#DDDEDF]">
      <AuthMainLeftSection />

      <section className="flex w-full items-center justify-center overflow-y-auto bg-[#F5DFAD] p-8 lg:w-2/5">
        <div className="w-full max-w-sm rounded-2xl border border-[#2D4C51] bg-[#173236] p-8 shadow-2xl">
          {/* … header … */}
          <h1 className="font-anton mb-2 text-3xl font-bold text-[#F5DFAD]">
            User Register
          </h1>
          <p className="retro-glow mb-6 text-sm text-[#DDDEDF]">
            Your gateway to spectacular events!
          </p>

          <form onSubmit={formik.handleSubmit} className="font-lato space-y-6">
            {/* EMAIL */}
            <div className="relative">
              <Label htmlFor="email" className="text-[#DDDEDF]">
                Email
              </Label>
              {formik.touched.email && formik.errors.email && (
                <span className="absolute top-0 right-0 text-sm text-red-500">
                  {formik.errors.email}
                </span>
              )}
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51]"
              />
            </div>

            {/* FULL NAME */}
            <div className="relative">
              <Label htmlFor="fullName" className="text-[#DDDEDF]">
                Full Name
              </Label>
              {formik.touched.fullName && formik.errors.fullName && (
                <span className="absolute top-0 right-0 text-sm text-red-500">
                  {formik.errors.fullName}
                </span>
              )}
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51]"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Label htmlFor="password" className="text-[#DDDEDF]">
                Password
              </Label>
              {formik.touched.password && formik.errors.password && (
                <span className="absolute top-0 right-0 text-sm text-red-500">
                  {formik.errors.password}
                </span>
              )}
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51]"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Label htmlFor="confirmPassword" className="text-[#DDDEDF]">
                Confirm Password
              </Label>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="absolute top-0 right-0 text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </span>
                )}
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51]"
              />
            </div>

            {/* REFERRAL CODE (trigger only if NONE) */}
            <div className="flex items-center gap-2">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0 text-[#E67F3C] hover:underline"
                  >
                    Got Referral Code?
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl border border-[#2D4C51] bg-[#173236] p-6 text-[#F5DFAD] shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-anton text-xl">
                      Apply Referral Code
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#DDDEDF]">
                      Unlock a{" "}
                      <span className="font-semibold text-[#E67F3C]">
                        5% discount
                      </span>
                      .
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-3 pt-4">
                    <Label htmlFor="refCode" className="text-[#DDDEDF]">
                      Code
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="refCode"
                        name="refCode"
                        placeholder="EVENT2025"
                        value={formik.values.refCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-2/5 bg-[#22406B] text-[#F5DFAD] placeholder:text-[#A9A9A9]"
                      />
                      <Button
                        type="button"
                        className="w-3/5 bg-[#E67F3C] font-semibold text-[#173236] hover:bg-[#FF944D]"
                        onClick={applyReferralCode}
                        disabled={!formik.values.refCode.trim()}
                      >
                        Apply Code
                      </Button>
                    </div>
                  </div>

                  <DialogFooter className="pt-4">
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        className="text-sm text-[#DDDEDF] hover:underline"
                      >
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {refCodeStatus !== "NONE" && (
                <>
                  <b
                    className={`ml-auto text-sm ${
                      refCodeStatus === "VALID"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    Code {refCodeStatus}
                  </b>
                  <button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("refCode", "");
                      setRefCodeStatus("NONE");
                    }}
                    className="text-xs text-[#DDDEDF] transition-colors hover:text-white"
                    aria-label="Remove referral code"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>

            {/* Show status once applied */}
            {/* {refCodeStatus !== "NONE" && (
              <div className="flex items-center gap-1">
                <b
                  className={`text-sm ${
                    refCodeStatus === "VALID"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Code {refCodeStatus}
                </b>

                <button
                  type="button"
                  onClick={() => {
                    formik.setFieldValue("refCode", ""); // clear input
                    setRefCodeStatus("NONE"); // reset status
                  }}
                  className="text-xs text-[#DDDEDF] transition-colors hover:text-white"
                  aria-label="Remove referral code"
                >
                  ✕
                </button>
              </div>
            )} */}

            {/* SUBMIT */}
            <Button
              disabled={isPending || refCodeStatus === "INVALID"}
              type="submit"
              className="font-bitcount w-full rounded-md bg-[#E67F3C] py-2.5 text-white hover:bg-[#2E5A61]"
            >
              Register
            </Button>

            <p className="text-center text-sm text-[#DDDEDF]">
              Already a Nostrers?{" "}
              <Link
                href="/login"
                className="text-[#F5DFAD] underline hover:text-[#E67F3C]"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterUser;
