'use client'
import Image from "next/image"

const RegisterPage = () => {
  return (
    <main className="min-h-screen w-full flex overflow-hidden bg-[#173236] text-[#DDDEDF]">
      {/* LEFT SIDE BANNER */}
      <section className="hidden md:flex flex-col pt-28 w-2/3 px-16 bg-[#173236] shadow-[10px_0_20px_-5px_rgba(0,0,0,0.6)] relative z-10">
        {/* Animated Gradient Border */}
        <div className="absolute right-0 top-0 h-full w-1 animate-gradient-y bg-gradient-to-b from-[#F5DFAD] via-[#E67F3C] to-[#F5DFAD]" />

        {/* Branding */}
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

        {/* Marquee Section */}
        <div className="mt-auto pb-8">
          <h1 className="text-3xl font-bold mb-4 font-anton text-[#DDDEDF]">Sneak peek at what we cover</h1>
          <div className="relative overflow-hidden w-full h-40">
            <div className="absolute flex gap-6 animate-marquee whitespace-nowrap">
              {[
                { title: "File", image: "/file.svg" },
                { title: "Globe", image: "/globe.svg" },
                { title: "Next", image: "/next.svg" },
                { title: "Vercel", image: "/vercel.svg" },
                { title: "Window", image: "/window.svg" },
              ].flatMap((event) => [event, event]).map((event, index) => (
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

      {/* RIGHT FORM SECTION */}
      <section className="flex w-full md:w-1/3 items-center justify-center px-6 py-12 bg-[#F5DFAD] overflow-y-auto md:overflow-hidden">
        <div className="w-full max-w-sm rounded-2xl shadow-2xl border border-[#2D4C51] px-6 py-8 bg-[#173236]">
          <h1 className="text-3xl font-bold text-[#F5DFAD] mb-3 font-anton">
            Register
          </h1>
          <p className="mb-6 text-[#DDDEDF] retro-glow text-sm">
            Your gateway to spectacular events!
          </p>

          <form className="flex flex-col gap-y-6 font-lato">
            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block mb-1 text-[#DDDEDF]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your email"
              />
            </div>

            {/* FULLNAME */}
            <div>
              <label htmlFor="fullname" className="block mb-1 text-[#DDDEDF]">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                className="w-full px-3 py-2 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your full name"
              />
            </div>

            {/* USERNAME */}
            <div>
              <label htmlFor="username" className="block mb-1 text-[#DDDEDF]">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-3 py-2 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your username"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block mb-1 text-[#DDDEDF]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="••••••••"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full font-bitcount py-2.5 rounded-md bg-[#E67F3C] hover:bg-[#2E5A61] text-white font-bold tracking-wide transition-all duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default RegisterPage
