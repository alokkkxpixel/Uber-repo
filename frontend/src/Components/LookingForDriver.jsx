import React from "react";
import { FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { IoCalendarNumber, IoSpeedometer } from "react-icons/io5";
import { RiNumber1, RiStopMiniFill } from "react-icons/ri";

const LookingForDriver = (props) => {
  return (
    <div>
      <div className="absolute top-2 right-3 text-3xl">
        <h1
          onClick={() => {
            props.setLookingDriver(false);
          }}
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h1>
      </div>
      <h1 className="text-2xl capitalize font-semibold mb-4">
        Looking for a driver
      </h1>
      <div className="flex flex-col mb-5 items-center">
        {props.vehicleType === "car" ? (
          <img
            onClick={() => {
              props.setWaitingDriver(true);
            }}
            className="w-40 my-2"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
            alt="Car"
          />
        ) : props.vehicleType === "auto" ? (
          <img
            onClick={() => {
              props.setWaitingDriver(true);
            }}
            className="w-40 my-2"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
            alt="Auto"
          />
        ) : (
          <img
            onClick={() => {
              props.setWaitingDriver(true);
            }}
            className="w-40 my-2"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
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
                <h4 className="text-2xl font-semibold"></h4>
                <p className=" font-medium text-zinc-700 capitalize">
                  {props.Pickup}
                </p>
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
            <div className="flex    items-center gap-5">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <FaCreditCard />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-2xl font-bold">
                  ₹{props.fare[props.vehicleType]}
                </h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  Only Cash recive
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex    items-center gap-5">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <IoCalendarNumber />
              </h3>
              <div className=" flex items-center gap-5 py-2 ">
                <h4 className="text-2xl px-3 py-2 rounded-lg bg-zinc-300 font-bold">
                  {props.otp}
                </h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  OTP for Driver
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
