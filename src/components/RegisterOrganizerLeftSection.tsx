const RegisterOrganizerLeftSection = () => {
  return (
    <section className="relative z-20 hidden h-screen flex-col bg-[#173236] px-16 pt-20 shadow-[10px_0_20px_-5px_rgba(0,0,0,0.6)] md:flex lg:w-[60%]">
      <div className="animate-gradient-y absolute top-0 right-0 hidden h-full w-1 lg:block" />
      <div className="animate-gradient-y absolute bottom-0 left-0 h-1 w-full lg:hidden" />

      <div
        id="organizer-notice"
        className="mx-auto flex w-full flex-col gap-6 px-4 md:px-0"
      >
        <h1 className="font-anton text-4xl font-bold text-[#F5DFAD]">
          Organizer Notice
        </h1>
        <p className="text-base text-[#DDDEDF] md:text-lg">
          Important steps and requirements before your organizer account gets
          verified:
        </p>

        <div className="space-y-4 rounded-xl border border-[#2E5A61] bg-[#17326C]/40 px-6 py-10 shadow-md backdrop-blur-md">
          <ul className="font-lato list-inside list-decimal space-y-3 text-sm leading-relaxed text-[#DDDEDF] md:text-base">
            <li>
              Fill out the{" "}
              <span className="font-semibold text-[#F5DFAD]">
                Organizer Registration
              </span>{" "}
              form.
            </li>
            <li>
              We will send a follow-up email to confirm your intent and gather
              further info.
            </li>
            <li>
              You&apos;ll be required to submit the following documents:
              <ul className="mt-2 ml-5 list-inside list-disc space-y-1">
                <li>Valid ID of the person in charge (KTP/SIM/Passport)</li>
                <li>Legal entity docs (e.g., NIB, Akta, company profile)</li>
                <li>Event portfolio or past experience references</li>
              </ul>
            </li>
            <li>
              Once verified, you’ll get full access to our{" "}
              <span className="font-medium text-[#F5DFAD]">
                Organizer Dashboard
              </span>{" "}
              to publish events.
            </li>
            <li>
              Questions? Contact us at{" "}
              <span className="text-[#E67F3C]">support@nostratik.com</span>.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RegisterOrganizerLeftSection;
