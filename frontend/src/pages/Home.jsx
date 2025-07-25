import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearch from "../Components/LocationSearch";
import { MdPerson } from "react-icons/md";
const Home = () => {
  const [Pickup, setPickup] = useState("");
  const [Destination, setDestination] = useState("");
  const pannelRef = useRef(null);
  const [pannelOpen, setpannelOpen] = useState(false);
  // const [pannelOpenArrow, setpannelOpenArrow] = useState(false);
  // const [VehicalPannelOpen, setVehicalPannelOpen] = useState(true);
  // const VehicalPannelRef = useRef(null);
  const ArrowDown = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(Pickup, Destination);
  };

  useGSAP(
    function () {
      if (pannelOpen) {
        gsap.to(pannelRef.current, {
          height: "70%",
          padding: 15,
        });
        gsap.to(ArrowDown.current, {
          opacity: 1,
        });
      } else {
        gsap.to(pannelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(ArrowDown.current, {
          opacity: 0,
        });
      }
    },
    [pannelOpen]
  );
  // useGSAP(function () {
  //   if (VehicalPannelOpen) {
  //     gsap.to(VehicalPannelRef.current),
  //       {
  //         transform: "translateY(0)",
  //       };
  //   } else {
  //     gsap.to(VehicalPannelRef.current),
  //       {
  //         transform: "translateY(100%)",
  //       };
  //   }
  // });
  return (
    <div className="h-screen relative">
      <img
        className="w-20  absolute left-3 top-2"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
        srcset=""
      />
      <div className="h-screen w-full   ">
        <img
          className="h-full w-full object-cover"
          src="https://c8.alamy.com/comp/2YG9G22/herbede-regierungsbezirk-arnsberg-de-germany-north-rhine-westphalia-n-51-25-17-n-7-16-45-map-cartascapes-map-published-in-2024-explore-cartascapes-a-map-revealing-earths-diverse-landscapes-cultures-and-ecosystems-journey-through-time-and-space-discovering-the-interconnectedness-of-our-planets-past-present-and-future-2YG9G22.jpg"
          alt=""
        />
      </div>
      <div className=" top-0 flex flex-col justify-end absolute h-screen w-full ">
        <div className="bg-white relative h-[30%] p-5">
          <h5 className="  absolute top-2 right-3 text-3xl">
            <i
              onClick={() => {
                setpannelOpen(false);
              }}
              ref={ArrowDown}
              className="opacity-0 ri-arrow-down-wide-line"
            ></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              onClick={() => {
                setpannelOpen(true);
              }}
              value={Pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="px-5 py-3 text-lg bg-zinc-100 my-3 rounded-md w-full placeholder:text-lg"
              type="text"
              placeholder="Add a pickup  Location"
            />
            <input
              onClick={() => {
                setpannelOpen(true);
              }}
              value={Destination}
              onChange={(e) => setDestination(e.target.value)}
              className="px-5 py-3 text-lg bg-zinc-100 my-3 rounded-md w-full placeholder:text-lg"
              type="text"
              placeholder="Enter your Destination"
            />
          </form>
        </div>
        <div ref={pannelRef} className="h-[%] bg-white overflow-auto ">
          <LocationSearch />
        </div>
      </div>
      <div
        //  ref={VehicalPannelRef}
        className="fixed translate-y-100 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <h4 className="text-2xl font-semibold mb-5">Choose your vehical</h4>
        <div className="flex gap-2  items-center mb-4  px-2 rounded-lg  active:border-black  bg-gray-100">
          <img
            className="w-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
            alt=""
          />
          <div
            className="flex flex-col items-start bg--200 py-3 w-1/2
          "
          >
            <h4 className="text-xl  font-semibold">
              UberGo
              <span className="text-lg ml-2">
                <i className="ri-user-fill"></i>3
              </span>
            </h4>
            <h5 className="text-base font-semibold ">2min away</h5>
            <p className="text-sm font-normal">Afforrble price and confort</p>
          </div>
          <h3 className="text-2xl font-semibold"> $193.20</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
