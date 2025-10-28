import React, { useState } from "react";
import { FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { RiStopMiniFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const ConfirmRidePop = (props) => {
  const [Otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h5 className="  absolute top-2 right-3 text-3xl">Y</h5>
      <h1 className="text-2xl capitalize font-semibold mb-4">
        confirm Ride available!
      </h1>
      <div className="flex items-center justify-between mt-4 bg-yellow-300 py-4 px-2 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-13 w-13 rounded-full pbejct-cover"
            src="https://media.istockphoto.com/id/1664876848/photo/happy-crossed-arms-and-portrait-of-asian-man-in-studio-smile-for-career-work-and-job.jpg?s=612x612&w=0&k=20&c=2vYaOMnlmzMEmB441bTWHUyeFXRIh56wE79QAhVWYBk="
            alt=""
          />
          <h2 className="text-lg font-semibold">{props.passenger?.userId?.fullname?.firstName + ' ' + props.passenger?.userId?.fullname?.lastName  }</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col mb-5 items-center">
        <div className="flex flex-col w-full items-center border-t border-zinc-400">
          <div className="w-full  py-2 bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-2xl rounded-full bg-zinc-200">
                <FaLocationDot />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-xl font-semibold"> Pickup location</h4>
                <p className=" font-medium text-zinc-700 ">
                 {props.passenger?.Pickup}
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
                <h4 className="text-xl font-semibold">Destination</h4>
                <p className=" font-medium text-zinc-700 ">
                 {props.passenger?.Destination}
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
                <h4 className="text-2xl font-bold">₹{props.passenger?.fare}</h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  Only Cash recive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            value={Otp}
            required
            onChange={(e) => setOtp(e.target.value)}
            type="Number"
            className="w-full py-3 px-10 my-5 flex items-center justify-center font-mono text-lg outline-none text-black  bg-zinc-200  rounded-lg "
            placeholder="Enter OTP"
          />
          <Link
            to="/captain-riding"
            onClick={() => {
              // props.comfirmRide();
            }}
            className="w-full flex items-center justify-center rounded-md bg-green-400 py-2 px-3 text-xl text-white font-semibold"
          >
            Confirm Ride
          </Link>
          <button
            onClick={() => {
              props.setConfirmridePopupPannel(false);
              props.setridePopupPannel(false);
            }}
            className="w-full mt-3 rounded-md bg-red-500 py-2 px-3 text-xl text-white font-semibold"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePop;
