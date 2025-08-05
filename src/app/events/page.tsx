import EventList from "@/components/EventList";
import { PaginationSection } from "@/components/PaginationSection";
import SearchBar from "@/components/SearchBar";
import React, { Suspense } from "react";

function eventPage() {
  return (
    <section className="container mx-auto px-4">
      
      <Suspense>
        <SearchBar />
        <EventList />
        <PaginationSection />
      </Suspense>
    </section>
  );
}

export default eventPage;
