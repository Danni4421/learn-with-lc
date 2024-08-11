"use client";

import { Image } from "@chakra-ui/react";
import { Activity } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

type ActivitiesProps = {
  activities: Activity[];
  className?: string;
};

export default function Activities({
  activities,
  className = "",
  ...props
}: ActivitiesProps) {
  return (
    <div {...props} className="w-[85vw] h-[700px]" id="activities">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="w-full h-full"
      >
        {activities.map((activity) => (
          <SwiperSlide key={activity.key}>
            <Image
              src={activity.data.url}
              alt={activity.data.id}
              className="w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
