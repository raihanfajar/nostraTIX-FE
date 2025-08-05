"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventWithDetails } from "@/types/event";
import { axiosInstance } from "@/utils/axiosInstance";
import FormattedEventDate from "@/utils/formatEventDate";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EventTabsProps {
  event: EventWithDetails;
}

interface Location {
  id: number;
  name: string;
}

export function EventTabs({ event }: EventTabsProps) {
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    async function fetchLocation() {
      try {
        const country = await axiosInstance.get<Location>(
          `location/country/${event.countryId}`,
        );
        const city = await axiosInstance.get<Location>(
          `location/city/one/${event.cityId}`,
        );

        setCountry(country.data.name);
        setCity(city.data.name);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    }

    fetchLocation();
  }, [event.countryId, event.cityId]);

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="Description">
        <TabsList className="w-full ">
          <TabsTrigger value="Description" className="text-[#F5DFAD]">
            Description
          </TabsTrigger>
          <TabsTrigger value="Ticket" className="text-[#F5DFAD]">
            Ticket
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Description" className="flex-grow">
          <Card className="bg-[#173236]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#F5DFAD]">
                {event.name}
              </CardTitle>
              <CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-2xl text-[#F5DFAD]" />
                    <span className="text-[#DDDEDF]">
                      {`${country}, ${city}, ${event.location}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-2xl text-[#F5DFAD]" />
                    <div className="text-[#DDDEDF]">
                      <FormattedEventDate
                        startDate={event.startDate}
                        endDate={event.endDate}
                      />
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="text-xl font-bold text-[#F5DFAD]">
                Description
              </div>
              <div className="text-[#DDDEDF]">{event.description}</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Ticket">
          <Card className="bg-[#173236]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#F5DFAD]">
                Ticket
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {event.ticketCategories.map((ticket) => (
                <>
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-[#DDDEDF]">{ticket.name}</div>
                      <div className="text-[#DDDEDF]">{ticket.description}</div>
                    </div>
                    <div className="text-[#DDDEDF]">
                      {ticket.price === 0
                        ? "Free"
                        : ticket.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-[#F5DFAD]"></div>
                </>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={`/organizer/${event.slug}`}>
                <Button className="font-bitcount flex h-8 w-24 items-center justify-center rounded-lg border-2 border-[#2D4C51] bg-[#224046] text-[#F5DFAD] transition-colors hover:border-[#de5b28] hover:bg-[#F5DFAD] hover:text-[#224046]">
                  Buy Ticket
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
