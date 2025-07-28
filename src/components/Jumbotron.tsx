"use client";

import * as React from "react";
import Image from "next/image"; // 1. Impor Image
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // 2. Impor Autoplay

const images = [
  "/contohBanner.webp",
  "/contohBanner.webp",
  "/NostraTixLogo.png",
  "/NostraTixLogoTicket.png",
];

const Jumbotron = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  React.useEffect(() => {
    if (!api) return;
  }, [api]);

  // 3. Inisialisasi plugin Autoplay
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );

  return (
    // Bagian luar tidak perlu diubah
    <div className="mt-10 w-full rounded-2xl border-4 border-[#F5DFAD] p-6">
      <div className="animate-tv-glow w-full overflow-hidden rounded-2xl border-2 border-[#F5DFAD] md:h-80">
        <div className="mx-auto w-full">
          {" "}
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[plugin.current]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0">
                    {/* 5. Ganti konten Card dengan komponen Image */}
                    <CardContent className="relative flex h-36 w-full items-center justify-center md:h-80">
                      <Image
                        src={src}
                        alt={`Carousel image ${index + 1}`}
                        layout="fill"
                        objectFit="fill"
                      />
                    </CardContent>
                  </Card>
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
