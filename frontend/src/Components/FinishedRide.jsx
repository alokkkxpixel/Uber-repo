import React from "react";
import { FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { RiStopMiniFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const FinishedRide = (props) => {
  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold mb-4">
        Finish this Ride
      </h1>
      <div className="flex items-center justify-between mt-4 bg-yellow-300 py-4 px-2 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-13 w-13 rounded-full pbejct-cover"
            src="https://media.istockphoto.com/id/1664876848/photo/happy-crossed-arms-and-portrait-of-asian-man-in-studio-smile-for-career-work-and-job.jpg?s=612x612&w=0&k=20&c=2vYaOMnlmzMEmB441bTWHUyeFXRIh56wE79QAhVWYBk="
            alt=""
          />
          <h2 className="text-lg font-semibold">Alokk pithale</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col mb-5 items-center">
        <div className="flex flex-col w-full items-center border-t border-zinc-400">
          <div className="w-full  py-2 bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-xl rounded-full bg-zinc-200">
                <FaLocationDot />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-xl font-semibold"> 524/11-A</h4>
                <p className=" font-medium text-zinc-700 ">
                  Narendra nagar nagpur near airport maharathi hotel
                  banglore,Karnatakka
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex border-b border-zinc-400  items-center gap-3">
              <h3 className=" p-2 text-xl rounded-full bg-zinc-200">
                <RiStopMiniFill />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-xl font-semibold"> Trunk Book Nagpur</h4>
                <p className=" font-medium text-zinc-700 ">
                  Narendra nagar nagpur near airport maharathi hotel
                  banglore,Karnatakka
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-2  bg-zinc-50 ">
            <div className="flex    items-center gap-5">
              <h3 className=" p-2 text-xl rounded-full bg-zinc-200">
                <FaCreditCard />
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-2xl font-bold"> $193.20</h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  Only Cash recive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/captain-home"
          onClick={() => {
            props.setfinishedRide(false);
          }}
          className="w-full flex items-center justify-center mt-3 rounded-md bg-green-500 py-2 px-3 text-xl text-white font-semibold"
        >
          Finish Ride
        </Link>
        <p className="text-xs text-center text-red-500 mt-5 ">
          Click on Finish ride Button if you have completed the payment.
        </p>
      </div>
    </div>
  );
};

export default FinishedRide;
