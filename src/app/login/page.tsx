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
import { useUserLogin } from "@/hooks/auth/useUserLogin";
import { axiosInstance } from "@/utils/axiosInstance";
import { loginUserVS } from "@/utils/validationSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginUserPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutateAsync: loginUser, isPending } = useUserLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "", resetEmail: "" },
    validationSchema: loginUserVS,
    onSubmit: async (values) => {
      await loginUser({ email: values.email, password: values.password });
    },
  });

  const sendResetLink = async () => {
    const resetEmail = formik.values.resetEmail.trim();

    try {
      await axiosInstance.post("api/auth/reset-password", {
        email: resetEmail,
        targetRole: "USER",
      });

      toast.success("Reset link sent to your email");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send reset link");
    }
  };

  return (
    <main className="flex min-h-screen bg-[#173236] text-[#DDDEDF]">
      <AuthMainLeftSection />

      <section className="flex w-full items-center justify-center bg-[#F5DFAD] px-8 py-16 lg:w-2/5">
        <div className="w-full max-w-sm rounded-2xl border border-[#2D4C51] bg-[#173236] px-6 py-10 shadow-2xl sm:px-8">
          <h1 className="font-anton mb-3 text-3xl font-bold text-[#F5DFAD]">
            User Login
          </h1>
          <p className="retro-glow mb-8 text-sm">
            Your gateway to spectacular events!
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-y-6"
          >
            <div>
              <label htmlFor="email" className="mb-1 block text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-4 py-2 text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C]"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-4 py-2 text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C]"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="font-bitcount w-full rounded-md bg-[#E67F3C] py-2 font-bold tracking-wide text-white transition hover:bg-[#2E5A61] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>

            <div className="space-y-1 text-center text-sm">
              {/* Forgot Password */}
              <p>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="mb-3 px-3 text-[#E67F3C] hover:underline"
                    >
                      Forgot your password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl border border-[#2D4C51] bg-[#173236] p-6 text-[#F5DFAD] shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-anton text-xl">
                        Forgot Password
                      </DialogTitle>
                      <DialogDescription className="text-sm text-[#DDDEDF]">
                        Enter your email below. We will send you a reset
                        password link.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 pt-4">
                      <Label htmlFor="resetEmail" className="text-[#DDDEDF]">
                        Reset Email
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          id="resetEmail"
                          name="resetEmail"
                          placeholder="Your registered email address"
                          value={formik.values.resetEmail}
                          onChange={formik.handleChange}
                          className="w-3/5 bg-[#22406B] text-[#F5DFAD] placeholder:text-[#A9A9A9]"
                        />
                        <Button
                          type="button"
                          className="w-2/5 bg-[#E67F3C] font-semibold text-[#173236] hover:bg-[#FF944D]"
                          onClick={sendResetLink}
                          disabled={false}
                        >
                          Send
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
              </p>

              {/* Register User */}
              <p>
                Not a Nostrers?{" "}
                <Link
                  href="/register"
                  className="text-[#F5DFAD] underline hover:text-[#E67F3C]"
                >
                  Register user
                </Link>
              </p>

              {/* Register Organizer */}
              <p>
                Are you an organizer?{" "}
                <Link
                  href="/register/organizer"
                  className="text-[#F5DFAD] underline hover:text-[#E67F3C]"
                >
                  Register organizer
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginUserPage;
