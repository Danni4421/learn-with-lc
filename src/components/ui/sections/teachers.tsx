"use client";

/** Components */
import { Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

/** Types */
import { type Teacher } from "@/types";

import "swiper/css";
import "swiper/css/pagination";

interface TeacherSectionProps {
  teachers: Teacher[];
  className?: string;
}

export function TeacherSection({
  teachers,
  className = "",
  ...props
}: TeacherSectionProps) {
  return (
    <div {...props} className={className} id="testimonials">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        centeredSlides={teachers.length <= 3}
        breakpoints={{
          540: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper cursor-grab"
      >
        {teachers.map((teacher) => (
          <SwiperSlide
            key={teacher.id}
            className="h-[500px] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <div className="relative w-64 h-60 mx-auto">
                <div className="w-full h-full bg-[#DBFF00] bg-opacity-30 rounded-t-full absolute"></div>
                <Image
                  src={teacher.image}
                  className="absolute object-cover bottom-0 w-full h-auto rounded-t-full"
                  alt="Teacher Image"
                />
              </div>
            </div>
            <div className="z-50">
              <div className="w-80 rounded-xl flex flex-col items-center p-5 bg-black text-white font-bold mx-auto">
                <h4 className="text-2xl text-default">{teacher.name}</h4>
                <p className="text-white text-wrap text-opacity-70 text-center">
                  {teacher.role}
                </p>
                <p className="mt-4">{teacher.last_graduate_at}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
