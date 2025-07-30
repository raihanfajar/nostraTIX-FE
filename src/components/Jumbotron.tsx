"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getBanner } from "@/hooks/getBanner";

const Jumbotron = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );

  const [banners, setBanners] = React.useState<string[]>([]); // state untuk banner

  React.useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banners = await getBanner();
        console.log("Fetched banners:", banners);
        setBanners(banners); // langsung set array of string
      } catch (err) {
        console.error("Failed to fetch banner:", err);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="mt-10 w-full rounded-2xl border-4 border-[#F5DFAD] p-6">
      <div className="animate-tv-glow w-full overflow-hidden rounded-2xl border-2 border-[#F5DFAD] md:h-80">
        <div className="mx-auto w-full">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[plugin.current]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="m-0">
              {banners.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="m-0 p-0" // hilangkan semua padding/margin
                >
                  <div className="relative h-36 w-full md:h-80">
                    <Image
                      src={src}
                      alt={`Carousel image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <div className="h-10 w-10 rounded-full bg-[#de5b28]" />
        <div className="ml-auto flex items-center gap-2 text-[#F5DFAD] md:gap-5">
          <ChevronUp className="h-5 w-5 md:h-7 md:w-7" />
          <ChevronDown className="h-5 w-5 md:h-7 md:w-7" />
          <Plus className="h-5 w-5 md:h-7 md:w-7" />
          <Minus className="h-5 w-5 md:h-7 md:w-7" />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
