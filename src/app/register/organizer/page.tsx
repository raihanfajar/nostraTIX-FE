"use client";
import RegisterOrganizerLeftSection from "@/components/RegisterOrganizerLeftSection";
import { RegisterOrganizerNoticeDialog } from "@/components/RegisterOrganizerNoticeDialog";
import { useOrganizerRegister } from "@/hooks/useOrganizerRegister";
import { registerOrganizerVS } from "@/utils/validationSchema";
import { useFormik } from "formik";
import Link from "next/link";

const RegisterOrganizerPage = () => {
  const { mutateAsync: registerOrganizer, isPending } = useOrganizerRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerOrganizerVS,
    onSubmit: async (values) => {
      await registerOrganizer({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <main className="font-anton flex w-full flex-col bg-[#173236] text-[#DDDEDF] lg:h-screen lg:flex-row">
      {/* LEFT SIDE BANNER */}
      <RegisterOrganizerLeftSection />

      {/* RIGHT FORM SECTION */}
      <section className="flex h-screen w-full items-start justify-center overflow-y-auto bg-[#F5DFAD] px-4 py-8 md:h-screen md:items-center md:overflow-y-hidden md:px-6 md:py-12 lg:w-2/5">
        <div className="w-full max-w-lg rounded-2xl border border-[#2D4C51] bg-[#173236] px-4 py-6 shadow-2xl md:scale-125 md:px-24 md:py-8 lg:scale-90">
          <h1 className="font-anton mb-3 flex items-center justify-between text-2xl font-bold text-[#F5DFAD] md:text-3xl">
            Organizer Register
            <div className="md:hidden">
              <RegisterOrganizerNoticeDialog />
            </div>
          </h1>
          <p className="retro-glow mb-4 text-xs text-[#DDDEDF] md:text-sm">
            Your gateway to spectacular events!
          </p>

          <form onSubmit={formik.handleSubmit} className="font-lato space-y-6">
            {/* EMAIL */}
            <div className="relative flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm text-[#DDDEDF] md:text-lg"
              >
                Email
              </label>
              {formik.touched.email && formik.errors.email && (
                <span className="absolute top-0 right-0 text-lg text-red-500">
                  {formik.errors.email}
                </span>
              )}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-3 py-2 text-sm text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C] focus:outline-none md:py-2.5 md:text-lg"
              />
            </div>

            {/* ORGANIZER NAME */}
            <div className="relative flex flex-col space-y-1">
              <label
                htmlFor="name"
                className="text-sm text-[#DDDEDF] md:text-lg"
              >
                Organizer Name
              </label>
              {formik.touched.name && formik.errors.name && (
                <span className="absolute top-0 right-0 text-lg text-red-500">
                  {formik.errors.name}
                </span>
              )}
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your organizer name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-3 py-2 text-sm text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C] focus:outline-none md:py-2.5 md:text-lg"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm text-[#DDDEDF] md:text-lg"
              >
                Password
              </label>
              {formik.touched.password && formik.errors.password && (
                <span className="absolute top-0 right-0 text-lg text-red-500">
                  {formik.errors.password}
                </span>
              )}
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-3 py-2 text-sm text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C] focus:outline-none md:py-2.5 md:text-lg"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative flex flex-col space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-[#DDDEDF] md:text-lg"
              >
                Confirm Password
              </label>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="absolute top-0 right-0 text-lg text-red-500">
                    {formik.errors.confirmPassword}
                  </span>
                )}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-[#2D4C51] bg-[#F5DFAD] px-3 py-2 text-sm text-[#173236] placeholder:text-[#2D4C51] focus:ring-2 focus:ring-[#E67F3C] focus:outline-none md:py-2.5 md:text-lg"
              />
            </div>

            {/* SUBMIT */}
            <button
              disabled={isPending}
              type="submit"
              className="font-bitcount w-full rounded-md bg-[#E67F3C] py-2.5 text-white hover:bg-[#2E5A61]"
            >
              Register
            </button>

            {/* FOOTER LINK */}
            <p className="text-center text-sm text-[#DDDEDF]">
              Not where you belong?{" "}
              <Link
                href="/login"
                className="text-[#F5DFAD] underline hover:text-[#E67F3C]"
              >
                Back to main login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterOrganizerPage;
