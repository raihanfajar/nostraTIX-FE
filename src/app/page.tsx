"use client";

import EventList from "@/components/EventList";
import Jumbotron from "@/components/Jumbotron";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Jumbotron />
      <div className="mt-15 flex h-10 items-end justify-between px-1">
        <div className="text-3xl text-[#F5DFAD]">Events</div>
        <div className="text-md text-[#E67F3C]">
          <Link href={`/events`}>See All Our Events..</Link>
        </div>
      </div>
      <div className="animate-gradient-nav top-0 left-0 mt-5 h-[3px] w-full" />
      <Suspense>
        <EventList />
      </Suspense>
    </div>
  );
}
