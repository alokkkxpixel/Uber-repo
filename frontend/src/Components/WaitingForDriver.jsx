import React from "react";
import { FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { RiStopMiniFill } from "react-icons/ri";

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
          <img
            className="w-30"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
            alt=""
          />
          <div className="flex flex-col items-end">
            <h2 className="text-lg -mb-2 font-medium">Alokk pithale</h2>
            <h4 className="text-2xl font-semibold">MH130-4h-56</h4>
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
                <h4 className="text-2xl font-semibold"> 524/11-A</h4>
                <p className=" font-medium text-zinc-700 ">
                  Narendra nagar nagpur near airport maharathi hotel
                  banglore,Karnatakka
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
                <h4 className="text-2xl font-semibold"> Trunk Book Nagpur</h4>
                <p className=" font-medium text-zinc-700 ">
                  Narendra nagar nagpur near airport maharathi hotel
                  banglore,Karnatakka
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
                <h4 className="text-2xl font-bold"> $193.20</h4>
                <p className="text-lg font-medium text-zinc-700 ">
                  Only Cash recive
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
