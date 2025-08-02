import React from "react";

const OrganizerDashboardPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params.slug;

  console.log(slug);

  return (
    <main className="container flex h-full flex-col space-y-5 p-4 text-white">
      <header>
        <h1 className="text-2xl font-bold">Main Header</h1>
      </header>

      <section>
        <p>Conditional Render Here</p>
      </section>
    </main>
  );
};

export default OrganizerDashboardPage;
