"use client";
import AuthMainLeftSection from "@/components/AuthMainLeftSection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrganizerLogin } from "@/hooks/auth/useOrganizerLogin";
import { loginUserVS } from "@/utils/validationSchema";
import { useFormik } from "formik";

const LoginOrganizerPage = () => {
  const { mutateAsync: loginOrganizer, isPending } = useOrganizerLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginUserVS,
    onSubmit: async (values) => {
      await loginOrganizer(values);
    },
  });

  return (
    <main className="flex min-h-screen overflow-hidden bg-[#173236] text-[#DDDEDF]">
      {/* SIDE BANNER S */}
      <AuthMainLeftSection />
      {/* SIDE BANNER E */}

      {/* LOGIN SECTION S */}
      <section className="relative z-10 flex w-full items-center justify-center bg-[#F5DFAD] px-8 py-16 md:scale-150 lg:w-[40%] lg:scale-100">
        <div className="w-full max-w-sm rounded-2xl border border-[#2D4C51] bg-[#173236] px-6 py-10 shadow-2xl drop-shadow-xl transition-all duration-300 sm:px-8 sm:py-12 md:px-10">
          <h1 className="font-anton mb-3 text-3xl font-bold text-[#F5DFAD]">
            Organizer Login
          </h1>
          <p className="retro-glow mb-8 text-sm text-[#DDDEDF]">
            Your gateway to spectacular events!
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="font-lato flex flex-col gap-y-8"
          >
            {/* Email S */}
            <div>
              <label htmlFor="email" className="mb-2 block text-[#DDDEDF]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-4 py-3 text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C] focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            {/* Email E */}

            {/* PASSWORD S */}
            <div>
              <label htmlFor="password" className="mb-2 block text-[#DDDEDF]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-4 py-3 text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C] focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            {/* PASSWORD E */}

            {/* SUBMIT BUTTON S */}
            <button
              disabled={isPending}
              type="submit"
              className="font-bitcount w-full rounded-md bg-[#E67F3C] py-3 font-bold tracking-wide text-white transition-all duration-300 hover:cursor-pointer hover:bg-[#2E5A61] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
            {/* SUBMIT BUTTON E */}

            <Popover>
              <PopoverTrigger className="hover:cursor-pointer hover:text-[#E67F3C] hover:underline hover:decoration-[#E67F3C]">
                Having problem logging in?
              </PopoverTrigger>
              <PopoverContent className="rounded-2xl border-4 border-red-900 bg-[#173236] text-white shadow-2xl drop-shadow-xl transition-all duration-300">
                Please contact our support team sent from the initial email
                notification of registration for further assistance.
              </PopoverContent>
            </Popover>
          </form>
        </div>
      </section>
      {/* LOGIN SECTION E */}
    </main>
  );
};

export default LoginOrganizerPage;
