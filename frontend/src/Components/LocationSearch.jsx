import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";
const LocationSearch = () => {
  const Location = [
    {
      icon: <IoSchoolSharp />,
      destination: "Sheryians Coding School",
      addresss: " Near harsh bhaiya ka ghar ,Bhopal",
    },
    {
      icon: <IoSchoolSharp />,
      destination: "TrunkBook libraby and Study center",
      addresss: " Narendra nagar,Nagpur",
    },
    {
      icon: <FaLocationDot />,
      destination: "NIT Garden Narendra nagar",
      addresss: " Narendra nagar squre,Nagpur",
    },
  ];

  return (
    <div>
      {/* this is just  sample data */}

      {Location.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full  active:border my-3 bg-zinc-50 rounded-md p-1"
          >
            <div className="flex  items-center gap-3">
              <h3 className=" p-2 text-xl rounded-full bg-zinc-200">
                {item.icon}
              </h3>
              <div className=" flex flex-col py-2 ">
                <h4 className="text-lg font-semibold"> {item.destination}</h4>
                <p className="text-sm leading-4 tracking-tight">
                  {item.addresss}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearch;
