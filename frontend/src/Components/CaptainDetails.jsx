import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSpeed } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3 ">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdBuvbsYu7WYAAUY2AqSQRGNESsYdkucDkQ&s"
            alt=""
          />
          <h4 className="font-bold text-lg">Ayush Pithale</h4>
        </div>
        <div className=" flex flex-col ">
          <h1 className="text-xl font-bold">$209.50</h1>
          <h3 className=" inline-block bg-zinc-300 text-black ">Earned</h3>
        </div>
      </div>
      <div className="bg-gray-100 rounded-md flex items-center justify-between my-7 py-6 px-5  ">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-semibold">
            <MdOutlineSpeed />
          </div>

          <h3 className="font-semibold mt-2 text-lg">10.2</h3>
          <h5 className="text-sm font-medium text-zinc-600">Hours online</h5>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-semibold">
            <MdOutlineSpeed />
          </div>

          <h3 className="font-semibold mt-2 text-lg">10.2</h3>
          <h5 className="text-sm font-medium text-zinc-600">Hours online</h5>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-semibold">
            <LuNotebookText />
          </div>

          <h3 className="font-semibold mt-2 text-lg">10.2</h3>
          <h5 className="text-sm font-medium text-zinc-600">Hours online</h5>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
