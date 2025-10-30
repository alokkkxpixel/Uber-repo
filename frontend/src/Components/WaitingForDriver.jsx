import React from "react";
import { FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { RiStopMiniFill } from "react-icons/ri";
import Carpng  from "../assets/car.webp"
import autoPng from "../assets/auto.webp";
import motoPng from "../assets/moto.webp"
const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className="  absolute top-2 right-3 text-3xl">
        <h1
          onClick={() => {
            props.setWaitingDriver(false);
          }}
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h1>
      </h5>
      <h1 className="text-2xl capitalize font-semibold mb-4">
        waiting for driver
      </h1>
      <div className="flex flex-col mb-5 items-center">
        <div className="flex w-full items-center justify-between my-3 bg--400">
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
          <div className="flex flex-col items-end">
            <h2 className="text-xl mb-1 font-semibold">{props.ride?.captain?.fullname.firstName + " " + props.ride?.captain?.fullname.lastName}</h2>
            <h4 className="text-2xl font-semibold">{props.ride?.captain?.vehicle?.plate}</h4>
            <p className="text-base text-zinc-800">banglore,india</p>
          </div>
        </div>
        <div className="flex flex-col w-full items-center border-t border-zinc-400">
          <div className="w-full  py-2 bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <FaLocationDot />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-lg font-semibold">Pickup</h4>
                <p className=" font-medium capitalize text-xl text-zinc-700 ">
                  {props.ride?.Pickup}
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
                <h4 className="text-lg font-semibold">Destination</h4>
                <p className=" font-medium text-xl text-zinc-700 ">
                  {props.ride?.Destination}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex    items-center gap-5">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <FaCreditCard />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-2xl font-bold">${props.ride?.fare}</h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  Only Cash recive
                </p>
              </div>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-2xl capitalize  font-bold">{props.ride?.vehicleType}</h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  Vehicle Type
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex    items-center gap-5">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <IoCalendarNumberSharp/>
              </h3>
              <div className=" flex items-center gap-5 py-2 ">
                <h4 className="text-2xl px-3 py-2 rounded-lg bg-zinc-300 font-bold">
                  {props.otp ? props.otp : "loading..."}
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

export default WaitingForDriver;
