import { Facility } from "@/types";
import { FaUserFriends, FaVideo, FaWifi } from "react-icons/fa";
import { GiChemicalDrop } from "react-icons/gi";

type FacilitiesProps = {
  facilities: {
    [key: string]: Facility;
  };
  className?: string;
};

export default function Facilities({
  facilities,
  className = "",
  ...props
}: FacilitiesProps) {
  return (
    <section {...props} id="facilities" className={className}>
      <div className="font-default font-bold text-center mb-14 w-3/5 mx-auto">
        <span className="text-white">Fasilitas</span>
        <p className="text-white text-3xl">
          Fasilitas Terbaik untuk Mendukung Pembelajaran yang Optimal dan
          Menyenangkan
        </p>
      </div>
      <div className="flex w-[85vw] mx-auto gap-10 text-white lg:flex-row flex-col">
        <div className="flex flex-col justify-start order-1 lg:order-1">
          <div className="flex flex-col justify-center mb-10">
            <div>
              <div className="flex justify-start lg:justify-end">
                <FaWifi size={40} />
              </div>
              <h2 className="text-3xl lg:text-xl font-bold text-start lg:text-end mb-5">
                {facilities.wifi.title}
              </h2>
              <h4 className="text-xl lg:text-base text-start lg:text-end">
                {facilities.wifi.description}
              </h4>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <div className="flex justify-start lg:justify-end">
                <GiChemicalDrop size={40} />
              </div>
              <h2 className="text-3xl lg:text-xl font-bold text-start lg:text-end mb-5">
                {facilities.practice.title}
              </h2>
              <h4 className="text-xl lg:text-base text-start lg:text-end">
                {facilities.practice.description}
              </h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center order-3 lg:order-2">
          <img
            src="images/facility.svg"
            alt="About 1"
            className="lg:w-[800px] w-[300px]"
          />
        </div>
        <div className="flex flex-col justify-start order-2 lg:order-3">
          <div className="flex flex-col justify-center mb-10">
            <div>
              <div className="flex justify-start lg:justify-start">
                <FaUserFriends size={40} />
              </div>
              <h2 className="text-3xl lg:text-xl font-bold text-start lg:text-start mb-5">
                {facilities.accompaniment.title}
              </h2>
              <h4 className="text-xl lg:text-base text-start lg:text-start">
                {facilities.accompaniment.description}
              </h4>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <div className="flex justify-start lg:justify-start">
                <FaVideo size={40} />
              </div>
              <h2 className="text-3xl lg:text-xl font-bold text-start lg:text-start mb-5">
                {facilities.follow_up.title}
              </h2>
              <h4 className="text-xl lg:text-base text-start lg:text-start">
                {facilities.follow_up.description}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
