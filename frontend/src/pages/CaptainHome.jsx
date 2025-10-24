import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaHome } from "react-icons/fa";
import { FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSpeed } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import Ridepop from "../Components/Ridepop";
import ConfirmRidePop from "../Components/ConfirmRidePop";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPannel, setridePopupPannel] = useState(true);
  const [ConfirmridePopupPannel, setConfirmridePopupPannel] = useState(false);
  const RideRef = useRef(null);
  const ConfirmRideRef = useRef(null);


   const {socket} = useContext(SocketContext)
   const {captain} = useContext(CaptainDataContext)


   useEffect(()=>{
     
    console.log(captain)
      socket.emit("join", {  userId: captain._id , userType:"captain"})

   })


  useGSAP(
    function () {
      if (ConfirmridePopupPannel) {
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
    [ConfirmridePopupPannel]
  );
  useGSAP(
    function () {
      if (ridePopupPannel) {
        gsap.to(RideRef.current, {
          transform: "translateY(0)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 1,
        // });
      } else {
        gsap.to(RideRef.current, {
          transform: "translateY(100%)",
        });
        // gsap.to(VehicalPannelArrowRef.current, {
        //   opacity: 0,
        // });
      }
    },
    [ridePopupPannel]
  );
  return (
    <div className="h-screen">
      <div className=" h-3/5 w-full relative  ">
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
      <div className="h-1/2 bg--300 py-5 px-3">
        <CaptainDetails />
      </div>
      <div
        ref={RideRef}
        className="fixed w-full z-10 bottom-0 translate-y-100 bg-white px-3 py-10 pt-12"
      >
        <Ridepop
          setConfirmridePopupPannel={setConfirmridePopupPannel}
          setridePopupPannel={setridePopupPannel}
        />
      </div>
      <div
        ref={ConfirmRideRef}
        className="fixed h-screen w-full z-10 bottom-0 translate-y-100 bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePop
          setConfirmridePopupPannel={setConfirmridePopupPannel}
          setridePopupPannel={setridePopupPannel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
