"use client";

import { Image } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export function ForumBanner() {
  return (
    <div className="hero mt-24 w-full flex justify-center">
      <div className="bg-black w-11/12 md:w-4/5 rounded-2xl flex">
        <div className="w-full lg:w-3/5 lg:m-12 p-8">
          <h1 className="text-white text-4xl lg:text-6xl font-bold mb-5 leading-relaxed">
            <p>Jangan ragu</p>
            <p>Tanyakan saja</p>
          </h1>
          <p className="text-white text-base mb-6">
            Kami akan memberikan jawaban terbaik! <br /> Mulai mengetik
            pertanyaan Anda.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              className="w-full p-4 text-black rounded-lg outline-none ring-0 focus:border-none"
            />
            <button className="absolute right-3 top-2 px-4 py-3 rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] transition-transform duration-300 ease-in-out">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center md:justify-end items-end">
          <Image src="../images/ask.svg" alt="Ask" className="object-contain" />
        </div>
      </div>
    </div>
  );
}
