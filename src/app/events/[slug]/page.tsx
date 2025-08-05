"use client";

import Banner from "@/components/EventDetails/Banner";
import EventDetails from "@/components/EventDetails/EventDetails";
import { getEventBySlug } from "@/services/getEvents";
import { EventWithDetails } from "@/types/event";
import { use, useEffect, useState } from "react";

const EventDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<EventWithDetails | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const eventData = await getEventBySlug(resolvedParams.slug);
        if (!eventData) {
          throw new Error("Event not found");
        }
        setEvent(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch event");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [resolvedParams.slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-dots loading-3xl text-[#F5DFAD]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4">
      <Banner event={event!} />
      <EventDetails event={event!} />
    </section>
  );
};

export default EventDetailPage;
