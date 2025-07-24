const LoginPage = () => {
  return (
    <main className="min-h-screen flex bg-[#173236] text-white">
      {/* SIDE BANNER S */}
      <section className="hidden md:flex flex-col justify-center w-2/3 border-r-4 border-[#2D4C51] px-16">
        <h2 className="text-4xl font-bold mb-4 font-anton text-[#F5DFAD]">
          Welcome to NostraTik
        </h2>
        <p className="leading-relaxed text-[#DDDEDF] text-lg font-lato">
          Your event ticketing platform made simple and secure.
          <br />
          Buy, sell, and scan — all in one place.
        </p>
      </section>
      {/* SIDE BANNER E */}

      {/* LOGIN SECTION S */}
      <section className="flex w-full md:w-1/3 items-center justify-center px-6 py-20 bg-[#F5DFAD]">
        <div className="w-full max-w-sm rounded-2xl shadow-lg border border-[#2D4C51] px-8 py-10 bg-[#173236] transition-all duration-300">
          <h1 className="text-3xl font-bold text-[#F5DFAD] mb-8 font-anton">
            Login
          </h1>

          <form className="flex flex-col gap-y-6 font-lato">
            {/* USERNAME S */}
            <div>
              <label htmlFor="username" className="block mb-1 text-[#DDDEDF]">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-2 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="Enter your username"
              />
            </div>
            {/* USERNAME E */}

            {/* PASSWORD S */}
            <div>
              <label htmlFor="password" className="block mb-1 text-[#DDDEDF]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 rounded-md border border-[#2D4C51] bg-[#F5DFAD] text-[#173236] placeholder:text-[#2D4C51] focus:outline-none focus:ring-2 focus:ring-[#E67F3C]"
                placeholder="••••••••"
              />
            </div>
            {/* PASSWORD E */}

            {/* SUBMIT BUTTON S */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#E67F3C] hover:bg-[#2E5A61] text-white font-bold tracking-wide transition-all duration-300"
            >
              Login
            </button>
            {/* SUBMIT BUTTON E */}
          </form>
        </div>
      </section>
      {/* LOGIN SECTION E */}
    </main>
  );
};

export default LoginPage;
