import Image from "next/image";

const RegisterPage = () => {
  return (
    <main className="min-h-screen flex bg-[#173236] text-[#DDDEDF]">
      {/* SIDE BANNER S */}
      <section className="hidden md:flex flex-col pt-28 w-2/3 px-16 bg-[#173236] shadow-[10px_0_20px_-5px_rgba(0,0,0,0.6)] z-20 relative">
        <div className="absolute right-0 top-0 h-full w-1 animate-gradient-y" />

        <div className="flex flex-col gap-4">
          <Image className="ml-24" src="/NostraTixLogoTicket.png" alt="Logo" width={200} height={200} />
          <h1 className="text-4xl font-bold font-anton text-[#DDDEDF]">
            Welcome to <span className="text-[#F5DFAD]">Nostra</span><span className="text-[#E67F3C]">Tik</span>
          </h1>
          <p className="leading-relaxed text-lg font-lato">
            Your event ticketing platform made simple and secure.
            <br />
            Buy, sell, and scan — all in one place.
          </p>
        </div>

        <div className="mt-auto">
          <h1 className="text-3xl font-bold mb-4 font-anton text-[#DDDEDF]">Sneak peek at what we cover</h1>
          <div className="relative overflow-hidden w-full h-40">
            <div className="absolute flex gap-6 animate-marquee whitespace-nowrap">
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
                  className="w-48 flex-shrink-0 rounded-xl overflow-hidden border border-[#2D4C51] shadow-md bg-[#22406]"
                >
                  <div className="flex items-center justify-center h-24 bg-[#173236]">
                    <Image src={event.image} alt={event.title} width={100} height={100} className="h-12 w-auto" />
                  </div>
                  <div className="p-2 text-center text-sm text-[#F5DFAD] font-lato">
                    {event.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* SIDE BANNER E */}

      {/* Register SECTION S */}
      <section className="flex w-full md:w-1/3 items-center justify-center px-8 py-16 bg-[#F5DFAD] z-10 relative">
        <div className="w-full max-w-sm rounded-2xl shadow-2xl drop-shadow-xl border border-[#2D4C51] px-6 sm:px-8 md:px-10 py-10 sm:py-12 bg-[#173236] transition-all duration-300">

          <h1 className="text-3xl font-bold text-[#F5DFAD] mb-3 font-anton">
            Register
          </h1>
          <p className="mb-8 text-[#DDDEDF] retro-glow text-sm">Your gateway to spectacular events!</p>

          <form className="flex flex-col gap-y-8 font-lato">
            {/* EMAIL S */}
            <div>
              <label htmlFor="email" className="block mb-2 text-[#DDDEDF]">
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your email"
              />
            </div>
            {/* EMAIL E */}
            {/* FULLNAME S */}
            <div>
              <label htmlFor="fullname" className="block mb-2 text-[#DDDEDF]">
                fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                className="w-full px-4 py-3 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your fullname"
              />
            </div>
            {/* fullname E */}
            {/* FULLNAME S */}
            <div>
              <label htmlFor="username" className="block mb-2 text-[#DDDEDF]">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-3 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your username"
              />
            </div>
            {/* USERNAME E */}

            {/* PASSWORD S */}
            <div>
              <label htmlFor="password" className="block mb-2 text-[#DDDEDF]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="••••••••"
              />
            </div>
            {/* PASSWORD E */}

            {/* SUBMIT BUTTON S */}
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-[#E67F3C] hover:bg-[#2E5A61] text-white font-bold tracking-wide transition-all duration-300"
            >
              Register
            </button>
            {/* SUBMIT BUTTON E */}
          </form>
        </div>
      </section>

      {/* Register SECTION E */}
    </main>
  );
};

export default RegisterPage;
