import { EventWithDetails } from "@/types/event";
import React from "react";
import EventPhoto from "./EventPhoto";
import { EventTabs } from "./EventTabs";
import Link from "next/link";
import Image from "next/image";

interface EventDetailsProps {
  event: EventWithDetails;
}

function EventDetails({ event }: EventDetailsProps) {
  const photoUrls = [
    event?.pictures?.[0]?.picture1,
    event?.pictures?.[0]?.picture2,
    event?.pictures?.[0]?.picture3,
  ].filter((url): url is string => typeof url === "string");

  return (
    <div className="items my-10 flex flex-col-reverse justify-between gap-6 md:flex-row">
      <div className="w-full items-center justify-center rounded-2xl border-2 border-[#2D4C51] bg-[#224046] p-5 md:w-3/4">
        <EventTabs event={event} />
      </div>
      <div className="h-[470px] w-full items-center justify-center rounded-2xl border-2 border-[#2D4C51] bg-[#224046] p-5 md:w-1/4">
        <Link href={`/organizer/${event.slug}`}>
          <div className="mb-5 flex w-64 items-center gap-3 rounded-full border-1 border-[#F5DFAD] bg-[#173236] p-3">
            <Image
              src={`${event.organizer.profilePicture}`}
              alt={`${event.organizer.name}`}
              height={50}
              width={50}
              className="rounded-full object-cover"
            />
            <div className="text-xl text-[#DDDEDF]">{event.organizer.name}</div>
          </div>
        </Link>
        <EventPhoto photoUrls={photoUrls} />
      </div>
    </div>
  );
}

export default EventDetails;
