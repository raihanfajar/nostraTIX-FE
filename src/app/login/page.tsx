"use client";
import AuthMainLeftSection from "@/components/AuthMainLeftSection";
import { useUserLogin } from "@/hooks/auth/useUserLogin";
import { loginUserVS } from "@/utils/validationSchema";
import { useFormik } from "formik";
import Link from "next/link";

const LoginUserPage = () => {
  const { mutateAsync: loginUser, isPending } = useUserLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginUserVS,
    onSubmit: async (values) => {
      await loginUser(values);
    },
  });

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
              className="w-full rounded-md bg-[#E67F3C] py-2 font-bold tracking-wide text-white transition hover:bg-[#2E5A61] disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>

            <div className="space-y-1 text-center text-sm">
              <p>
                Not a Nostrers?{" "}
                <Link
                  href="/register"
                  className="text-[#F5DFAD] underline hover:text-[#E67F3C]"
                >
                  Register user
                </Link>
              </p>
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
