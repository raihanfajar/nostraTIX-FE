import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const OrganizerDashboardPage = async ({ params }: PageProps) => {
  const { slug } = await params; // ← await the promise
  console.log(slug);

  return (
    <main className="container flex h-full flex-col space-y-5 p-4 text-white">
      <header>
        <h1 className="text-2xl font-bold">Main Header</h1>
      </header>

      <section>
        <p>Conditional Render Here for {slug}</p>
      </section>
    </main>
  );
};

export default OrganizerDashboardPage;
