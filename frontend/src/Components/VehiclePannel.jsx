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
            UberGo
            <span className="text-lg ml-2">
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-base font-semibold ">2min away</h5>
          <p className="text-sm font-normal">Afforrble price and confort</p>
        </div>
        <h3 className="text-2xl font-semibold"> $193.20</h3>
      </div>
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPannelOpen(false);
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
            UberGo
            <span className="text-lg ml-2">
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-base font-semibold ">2min away</h5>
          <p className="text-sm font-normal">Afforrble price and confort</p>
        </div>
        <h3 className="text-2xl font-semibold"> $193.20</h3>
      </div>
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPannelOpen(false);
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
            UberGo
            <span className="text-lg ml-2">
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-base font-semibold ">2min away</h5>
          <p className="text-sm font-normal">Afforrble price and confort</p>
        </div>
        <h3 className="text-2xl font-semibold"> $193.20</h3>
      </div>
    </div>
  );
};

export default VehiclePannel;
