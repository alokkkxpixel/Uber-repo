import React from "react";

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
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
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
          src="https://w7.pngwing.com/pngs/739/731/png-transparent-bajaj-auto-auto-rickshaw-car-india-auto-rickshaw-vintage-car-mode-of-transport-vehicle.png"
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
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n"
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
