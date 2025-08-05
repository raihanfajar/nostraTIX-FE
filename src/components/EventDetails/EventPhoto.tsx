import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface EventPhotoProps {
  photoUrls: string[];
}

const EventPhoto = ({ photoUrls }: EventPhotoProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );
  return (
    <div>
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="m-0">
          {photoUrls.map((src, index) => (
            <CarouselItem key={index} className="m-0 p-0">
              <div className="relative h-36 w-full md:h-80">
                <Image
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  fill
                  className="object-fill"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default EventPhoto;
