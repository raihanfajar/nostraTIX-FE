"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/services/getEvents";
import Image from "next/image";
import Link from "next/link";
import { EventWithPicture } from "@/types/event";
import FormattedEventDate from "@/utils/formatEventDate";
import { useSearchParams } from "next/navigation";
import EventListSkeleton from "./EventListSkeleton";
import { IParams } from "@/types/params";

const EventList = () => {
  const [events, setEvents] = useState<EventWithPicture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);

      const filters: IParams = {
        name: searchParams.get("name"),
        category:
          searchParams.getAll("category").length > 0
            ? searchParams.getAll("category")
            : null,
        countryId: searchParams.get("countryId"),
        cityId: searchParams.get("cityId"),
        location: searchParams.get("location"),
        page: (() => {
          const pageParam = searchParams.get("page");
          const parsed = pageParam ? parseInt(pageParam) : undefined;
          return isNaN(parsed as number) ? undefined : parsed;
        })(),
        limit: 6,
      };

      try {
        const eventList = await getEvents(filters); // hasil dari getEvents adalah EventWithPicture[]
        setEvents(eventList);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Gagal mengambil data event.");
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, [searchParams]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="mt-10 mb-10 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        <EventListSkeleton count={3} />
      </div>
    );
  }

  return (
    <section className="mt-10 mb-10">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link href={`/events/${event.slug}`} key={event.id}>
            <div className="card group h-[350px] w-full border-2 border-[#2D4C51] bg-[#224046] shadow-sm transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD]">
              <figure className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={event.pictures?.[0]?.banner || "/fallback.jpg"}
                  alt={event.name}
                  fill
                  className="object-cover"
                  sizes="w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title w-full text-[#F5DFAD] group-hover:text-[#224046]">
                  <p className="truncate">{event.name}</p>
                </h2>
                <h2 className="card-title flex items-end justify-between text-base text-[#F5DFAD] group-hover:text-[#224046]">
                  <FormattedEventDate
                    startDate={event.startDate}
                    endDate={event.endDate}
                  />
                </h2>
                <p className="truncate text-[#DDDEDF] group-hover:text-[#E67F3C]">
                  {event.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EventList;
