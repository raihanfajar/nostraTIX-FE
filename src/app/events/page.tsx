import EventList from "@/components/EventList";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, { Suspense } from "react";

function eventPage() {
  return (
    <section className="container mx-auto px-4">
      <Suspense>
        <SearchBar />
      </Suspense>
      <Suspense>
        <EventList />
      </Suspense>
    </section>
  );
}

export default eventPage;
