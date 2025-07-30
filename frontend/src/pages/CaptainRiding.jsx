import React, { useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsChevronCompactUp } from "react-icons/bs";
import FinishedRide from "../Components/FinishedRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const CaptainRiding = () => {
  const finishedRideRef = useRef(null);
  const [finishedRide, setfinishedRide] = useState(false);
  useGSAP(
    function () {
      if (finishedRide) {
        gsap.to(finishedRideRef.current, {
          transform: "translateY(0)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 1,
        // });
      } else {
        gsap.to(finishedRideRef.current, {
          transform: "translateY(100%)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 0,
        // });
      }
    },
    [finishedRide]
  );
  return (
    <div className="h-screen">
      <div className=" h-4/5 w-full relative  ">
        <img
          className="h-full w-full object-cover"
          src="https://c8.alamy.com/comp/2YG9G22/herbede-regierungsbezirk-arnsberg-de-germany-north-rhine-westphalia-n-51-25-17-n-7-16-45-map-cartascapes-map-published-in-2024-explore-cartascapes-a-map-revealing-earths-diverse-landscapes-cultures-and-ecosystems-journey-through-time-and-space-discovering-the-interconnectedness-of-our-planets-past-present-and-future-2YG9G22.jpg"
          alt=""
        />
        <div className="absolute  top-5  px-5 left-0 w-full  flex items-center justify-between">
          <img
            className="w-[45px] "
            src="https://pngimg.com/d/uber_PNG24.png"
            alt=""
            srcset=""
          />
          <Link
            to="/"
            className="text-3xl font-semibold bg-zinc-100 p-2 rounded-full"
          >
            <IoIosLogOut />
          </Link>
        </div>
      </div>
      <div
        onClick={() => setfinishedRide(true)}
        className="h-1/5 w-full flex relative items-center justify-between px-10 bg-yellow-400 rounded-md"
      >
        <BsChevronCompactUp className="text-3xl absolute top-0 left-1/2" />
        <h4 className="text-xl font-semibold">4 KM away</h4>

        <button className=" flex items-center justify-center rounded-md bg-green-400 py-2 px-4 text-xl text-white font-semibold">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishedRideRef}
        className="fixed  w-full z-10 bottom-0 translate-y-100 bg-white px-3 py-10 pt-12"
      >
        <FinishedRide setfinishedRide={setfinishedRide} />
      </div>
    </div>
  );
};

export default CaptainRiding;
