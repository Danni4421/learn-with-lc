"use client";

/** Components */
import { Card, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";

/** Types */
import { type Testimony } from "@/types";

import "swiper/css";
import "swiper/css/scrollbar";

type TestimonialsProps = {
  testimonials: Testimony[];
  className?: string;
};

export function Testimonials({
  testimonials,
  className = "",
  ...props
}: TestimonialsProps) {
  return (
    <div {...props} className={className} id="testimonials">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          540: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        className="mySwiper cursor-grab"
      >
        {testimonials.map((testimony, index) => (
          <SwiperSlide key={index}>
            <Card className="mx-8 px-6 py-4">
              <div>
                <div className="flex justify-between">
                  <div className="text-black bg-[#DBFF00] bg-opacity-50 flex items-center justify-center text-5xl rounded-full p-2 -ml-14 -mt-4 w-20 h-20">
                    <FaQuoteLeft />
                  </div>
                  <h4 className="w-3/4 text-sm text-end mb-2">
                    Diterima{" "}
                    <b className="text-lg">{testimony.now_studied_at}</b>
                  </h4>
                </div>
                <p className="text-lg font-default line-clamp-6 mt-10">
                  {testimony.testimony}
                </p>
                <a
                  href={`/testimonials/${testimony.id}`}
                  className="text-indigo-500 flex items-center gap-2 mt-3"
                >
                  Baca Selengkapnya
                  <FaArrowRight />
                </a>
              </div>
              <div className="flex mt-10">
                <div className="flex items-center gap-3">
                  {testimony.image ? (
                    <Image
                      src={testimony.image}
                      alt="Testimoner photo"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex justify-center items-center font-bold text-md w-12 h-12 rounded-full bg-gray-500 text-white">
                      {testimony.testimoner_name
                        .split(" ")
                        .map((word, index) => {
                          if (index <= 2) {
                            return word.charAt(0);
                          }
                        })}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h4 className="font-extrabold text-lg">
                      {testimony.testimoner_name}
                    </h4>
                    <span>{testimony.last_graduate_at}</span>
                  </div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
