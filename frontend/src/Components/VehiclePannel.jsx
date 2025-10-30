import React from "react";
import Carpng  from "../assets/car.webp"
import autoPng from "../assets/auto.webp";
import motoPng from "../assets/moto.webp"

const VehiclePannel = (props) => {
  return (
    <div>
      <h5 className="  absolute top-2 right-3 text-3xl">
        <i
          onClick={() => {
            props.setVehicalPannelOpen(false);
          }}
          ref={props.VehicalPannelArrowRef}
          className="ri-arrow-down-wide-line"
        ></i>
      </h5>
      <h4 className="text-2xl font-semibold mb-5">Choose your vehical</h4>
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPannelOpen(false);
          props.selectVehicle("car");
        }}
        className="flex gap-2  items-center mb-4  px-2 rounded-lg  active:border-black  bg-gray-100"
      >
        <img
          className="w-20"
          src={Carpng}
          alt=""
        />
        <div
          className="flex flex-col items-start bg--200 py-3 w-1/2
          "
        >
          <h4 className="text-xl  font-semibold">
            Uber Go
            <span className="text-lg ml-2">
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-base font-semibold ">2min away</h5>
          <p className="text-sm font-normal">Afforrble price and confort</p>
        </div>
        <h3 className="text-2xl font-semibold">₹{props.fare.car}</h3>
      </div>
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPannelOpen(false);
          props.selectVehicle("auto");

        }}
        className="flex gap-2  items-center mb-4  px-2 rounded-lg  active:border-black  bg-gray-100"
      >
        <img
          className="w-20"
          src={autoPng}
          alt="Auto"
        />
        <div
          className="flex flex-col items-start bg--200 py-3 w-1/2
          "
        >
          <h4 className="text-xl  font-semibold">
            Uber Auto
            <span className="text-lg ml-2">
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-base font-semibold ">2min away</h5>
          <p className="text-sm font-normal">Afforrble price and confort</p>
        </div>
        <h3 className="text-2xl font-semibold">₹{props.fare.auto}</h3>
      </div>
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPannelOpen(false);
          props.selectVehicle("moto");

        }}
        className="flex gap-2  items-center mb-4  px-2 rounded-lg  active:border-black  bg-gray-100"
      >
        <img
          className="w-20"
          src={motoPng}
          alt="MoTo"
        />
        <div
          className="flex flex-col items-start bg--200 py-3 w-1/2
          "
        >
          <h4 className="text-xl  font-semibold">
            Uber Moto
            <span className="text-lg ml-2">
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-base font-semibold ">2min away</h5>
          <p className="text-sm font-normal">Afforrble price and confort</p>
        </div>
        <h3 className="text-2xl font-semibold">₹{props.fare.moto}</h3>
      </div>
    </div>
  );
};

export default VehiclePannel;
