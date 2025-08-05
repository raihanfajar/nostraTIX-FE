import { EventWithDetails } from "@/types/event";
import Image from "next/image";
import React from "react";

interface BannerProps {
  event: EventWithDetails;
}

function Banner(event: BannerProps) {
  return (
    <section className="my-10 flex items-center justify-center ">
      <div className="animate-tv-glow relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-[#F5DFAD] md:h-80">
        <Image
          src={event.event.pictures[0].banner}
          alt={`${event.event.name} Banner`}
          fill
          className="object-fill"
        />
      </div>
    </section>
  );
}

export default Banner;
