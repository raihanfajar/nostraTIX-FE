import Image from "next/image";

const AuthMainLeftSection = () => {
  return (
    <section className="relative z-20 hidden w-[60%] flex-col bg-[#173236] px-16 pt-20 shadow-[10px_0_20px_-5px_rgba(0,0,0,0.6)] lg:flex">
      <div className="animate-gradient-y absolute top-0 right-0 h-full w-1" />

      <div className="flex flex-col gap-4">
        <Image
          className="ml-24"
          src="/NostraTixLogoTicket.png"
          alt="Logo"
          width={200}
          height={200}
        />
        <h1 className="font-anton text-4xl font-bold text-[#DDDEDF]">
          Welcome to <span className="text-[#F5DFAD]">Nostra</span>
          <span className="text-[#E67F3C]">Tik</span>
        </h1>
        <p className="font-lato text-lg leading-relaxed">
          Your event ticketing platform made simple and secure.
          <br />
          Buy, sell, and scan — all in one place.
        </p>
      </div>

      <div className="mt-5">
        <h1 className="font-anton mb-4 text-3xl font-bold text-[#DDDEDF]">
          Sneak peek at what we cover
        </h1>
        <div className="relative h-40 w-full overflow-hidden">
          <div className="animate-marquee absolute flex gap-6 whitespace-nowrap">
            {/* MAPPING */}
            {[
              { title: "Dummy", image: "/file.svg" },
              { title: "Dummy", image: "/globe.svg" },
              { title: "Dummy", image: "/next.svg" },
              { title: "Dummy", image: "/vercel.svg" },
              { title: "Dummy", image: "/window.svg" },
              // Duplicate for infinite loop effect
              { title: "Dummy", image: "/file.svg" },
              { title: "Dummy", image: "/globe.svg" },
              { title: "Dummy", image: "/next.svg" },
              { title: "Dummy", image: "/vercel.svg" },
              { title: "Dummy", image: "/window.svg" },
            ].map((event, index) => (
              <div
                key={index}
                className="w-48 flex-shrink-0 overflow-hidden rounded-xl border border-[#2D4C51] bg-[#22406] shadow-md"
              >
                <div className="flex h-24 items-center justify-center bg-[#173236]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={100}
                    height={100}
                    className="h-12 w-auto"
                  />
                </div>
                <div className="font-lato p-2 text-center text-sm text-[#F5DFAD]">
                  {event.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthMainLeftSection;
