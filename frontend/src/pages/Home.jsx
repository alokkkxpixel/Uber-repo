import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearch from "../Components/LocationSearch";
import { MdPerson } from "react-icons/md";
import VehiclePannel from "../Components/VehiclePannel";
import ConfirmRidePannel from "../Components/ConfirmRidePannel";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
const Home = () => {
  const [Pickup, setPickup] = useState("");
  const [Destination, setDestination] = useState("");
  const pannelRef = useRef(null);
  const [pannelOpen, setpannelOpen] = useState(false);
  // const [pannelOpenArrow, setpannelOpenArrow] = useState(false);
  const [VehicalPannelOpen, setVehicalPannelOpen] = useState(false);
  const [ConfirmRide, setConfirmRide] = useState(false);
  const [LookingDriver, setLookingDriver] = useState(false);
  const [WaitingDriver, setWaitingDriver] = useState(false);
  const VehicalPannelRef = useRef(null);
  const VehicalPannelArrowRef = useRef(null);
  const ConfirmRideArrowRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const LookingDriverRef = useRef(null);
  const WaitingDriverRef = useRef(null);
  const waitaingDriverArrowRef = useRef(null);
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
  useGSAP(
    function () {
      if (VehicalPannelOpen) {
        gsap.to(VehicalPannelRef.current, {
          transform: "translateY(0)",
        });
        gsap.to(VehicalPannelArrowRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(VehicalPannelRef.current, {
          transform: "translateY(100%)",
        });
        gsap.to(VehicalPannelArrowRef.current, {
          opacity: 0,
        });
      }
    },
    [VehicalPannelOpen]
  );
  useGSAP(
    function () {
      if (ConfirmRide) {
        gsap.to(ConfirmRideRef.current, {
          transform: "translateY(0)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 1,
        // });
      } else {
        gsap.to(ConfirmRideRef.current, {
          transform: "translateY(100%)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 0,
        // });
      }
    },
    [ConfirmRide]
  );
  useGSAP(
    function () {
      if (LookingDriver) {
        gsap.to(LookingDriverRef.current, {
          transform: "translateY(0)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 1,
        // });
      } else {
        gsap.to(LookingDriverRef.current, {
          transform: "translateY(100%)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 0,
        // });
      }
    },
    [LookingDriver]
  );
  useGSAP(
    function () {
      if (WaitingDriver) {
        gsap.to(WaitingDriverRef.current, {
          transform: "translateY(0)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 1,
        // });
      } else {
        gsap.to(WaitingDriverRef.current, {
          transform: "translateY(100%)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 0,
        // });
      }
    },
    [WaitingDriver]
  );
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
          <LocationSearch
            setpannelOpen={setpannelOpen}
            setVehicalPannelOpen={setVehicalPannelOpen}
          />
        </div>
      </div>
      <div
        ref={VehicalPannelRef}
        className="fixed translate-y-100 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <VehiclePannel
          setConfirmRide={setConfirmRide}
          VehicalPannelArrowRef={VehicalPannelArrowRef}
          setVehicalPannelOpen={setVehicalPannelOpen}
        />
      </div>
      <div
        ref={ConfirmRideRef}
        className="fixed translate-y-100 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <ConfirmRidePannel
          setLookingDriver={setLookingDriver}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={LookingDriverRef}
        className="fixed translate-y-100 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <LookingForDriver
          setWaitingDriver={setWaitingDriver}
          setLookingDriver={setLookingDriver}
        />
      </div>
      <div
        ref={WaitingDriverRef}
        className="fixed translate-y-100 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <WaitingForDriver
          waitaingDriverArrowRef={waitaingDriverArrowRef}
          setWaitingDriver={setWaitingDriver}
        />
      </div>
    </div>
  );
};

export default Home;
