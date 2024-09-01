"use client";

import { useState } from "react";
import clsx from "clsx";

/** Components */
import { Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

/** Types */
import { type Activity } from "@/types";
import { type Swiper as SwiperType } from "swiper/types";

/** Utils */
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type ActivitiesProps = {
  activities: Activity[];
  className?: string;
};

export function Activities({
  activities,
  className = "",
  ...props
}: ActivitiesProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div {...props} className={clsx("w-[85vw]", className)} id="activities">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 rounded-lg"
        style={{ height: "550px" }}
      >
        {activities.map((activity, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <Image
              src={activity.data.url}
              alt={`Activity ${index + 1}`}
              className="object-cover cursor-grabbing"
              style={{ height: "100%", width: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{ height: "150px", marginTop: "15px" }}
      >
        {activities.map((activity, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center brightness-75 hover:brightness-100 transition-all cursor-grab"
          >
            <Image
              src={activity.data.url}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover rounded-lg"
              style={{ height: "100%", width: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
