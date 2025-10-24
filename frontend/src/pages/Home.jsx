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
import axios from "axios";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
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
  const [fare, setFare] = useState({});
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [otp, setOtp] = useState(null);
  const VehicalPannelRef = useRef(null);
  const VehicalPannelArrowRef = useRef(null);
  const ConfirmRideArrowRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const LookingDriverRef = useRef(null);
  const WaitingDriverRef = useRef(null);
  const waitaingDriverArrowRef = useRef(null);
  const ArrowDown = useRef(null);




  const { socket} = useContext(SocketContext)

    const { user, setUser } = useContext(UserDataContext);
  



  useEffect(() => {
    
      console.log(user);
       socket.emit("join",{userType:"user", userId:user._id})
    
  },[user] )

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log(Pickup, Destination);
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

  async function FindTrip() {
    setVehicalPannelOpen(true);
    setpannelOpen(false);
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { Pickup, Destination },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setDistance(response.data.distance);
    setDuration(response.data.duration);
    // console.log(response.data.fare);
    setFare(response.data.fare);
  }

  async function createRide() {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        Pickup,
        Destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOtp(response.data.ride.otp);
    console.log(response.data);
  }

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

            {Pickup && Destination && (
              <button
                onClick={() => FindTrip()}
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                Find Trip
              </button>
            )}
          </form>
        </div>
        <div ref={pannelRef} className="h-[%] bg-white overflow-auto ">
          <LocationSearch
            setpannelOpen={setpannelOpen}
            setVehicalPannelOpen={setVehicalPannelOpen}
            Pickup={Pickup}
            setPickup={setPickup}
            Destination={Destination}
            setDestination={setDestination}
          />
        </div>
      </div>
      <div
        ref={VehicalPannelRef}
        className="fixed translate-y-200 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <VehiclePannel
          fare={fare}
          selectVehicle={setVehicleType}
          setConfirmRide={setConfirmRide}
          VehicalPannelArrowRef={VehicalPannelArrowRef}
          setVehicalPannelOpen={setVehicalPannelOpen}
        />
      </div>
      <div
        ref={ConfirmRideRef}
        className="fixed translate-y-200 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <ConfirmRidePannel
          Pickup={Pickup}
          Destination={Destination}
          createRide={createRide}
          distance={distance}
          fare={fare}
          duration={duration}
          vehicleType={vehicleType}
          setLookingDriver={setLookingDriver}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={LookingDriverRef}
        className="fixed translate-y-200 bg-white w-full p-3 bottom-0 z-10 py-8"
      >
        <LookingForDriver
          Pickup={Pickup}
          Destination={Destination}
          distance={distance}
          fare={fare}
          otp={otp}
          duration={duration}
          vehicleType={vehicleType}
          setWaitingDriver={setWaitingDriver}
          setLookingDriver={setLookingDriver}
        />
      </div>
      <div
        ref={WaitingDriverRef}
        className="fixed translate-y-200 bg-white w-full p-3 bottom-0 z-10 py-8"
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
