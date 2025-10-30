import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { RiStopMiniFill } from "react-icons/ri";
import { GiPathDistance } from "react-icons/gi";
import { IoSpeedometer } from "react-icons/io5";
import Carpng  from "../assets/car.webp"
import autoPng from "../assets/auto.webp";
import motoPng from "../assets/moto.webp"
const ConfirmRidePannel = (props) => {
  return (
    <div>
      <h5
        className="  absolute top-2 right-3 text-3xl"
        onClick={() => {
          props.setConfirmRide(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h1 className="text-2xl capitalize font-semibold mb-4">
        Confirm Your Ride
      </h1>
      <div className="flex flex-col mb-5 items-center">
        {props.vehicleType === "car" ? (
          <img
            className="w-40 my-2"
            src={Carpng}
            alt="Car"
          />
        ) : props.vehicleType === "auto" ? (
          <img
            className="w-40 my-2"
            src={autoPng}
            alt="Auto"
          />
        ) : (
          <img
            className="w-40 my-2"
            src={motoPng}
            alt="Moto"
          />
        )}

        <div className="flex flex-col w-full items-center border-t border-zinc-400">
          <div className="w-full  py-2 bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <FaLocationDot />
              </h3>
              <div className=" flex flex-col py-2 ">
                <p className="font-medium text-xl  ">{props.Pickup}</p>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <RiStopMiniFill />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-2xl font-semibold">{props.distance}</h4>
                <p className=" font-medium text-zinc-700 ">
                  {props.Destination}
                </p>
              </div>

              <div className="flex border-l mx-auto border-zinc-400  items-center gap-3">
                <h3 className=" p-2 text-2xl rounded-full ">
                  <IoSpeedometer />
                </h3>
                <h4 className="text-2xl font-semibold">{props.duration}</h4>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <FaCreditCard />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-2xl font-semibold">
                  ${props.fare[props.vehicleType]}
                </h4>
                <p className=" font-medium text-zinc-700 ">Only Cash payment</p>
              </div>
            </div>
          </div>
          <div className="w-full py-2 flex items-center gap-5  bg-zinc-50 ">
            <div className="flex  mx-auto border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <GiPathDistance />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-lg font-semibold">{props.distance}</h4>
              </div>
            </div>
            <div className="flex  border-zinc-400 mx-auto  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <IoSpeedometer />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-lg font-semibold">{props.duration}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          props.setLookingDriver(true);
          props.setConfirmRide(false);
          props.createRide();
        }}
        className="w-full rounded-md bg-green-400 py-2 px-3 text-xl text-white font-semibold"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRidePannel;
