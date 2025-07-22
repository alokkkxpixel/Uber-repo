import React from "react";
import { Link } from "react-router-dom";
import UserSignup from "./UserSignup";
const Home = () => {
  return (
    <div
      className="bg-cover bg-zinc-700 bg-blend-overlay
 bg-center bg-[url(https://images.unsplash.com/9/barcelona-traffic.jpg?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex justify-between flex-col pt-8  "
    >
      <img
        className="w-30 ml-4 invert-100"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
        srcset=""
      />
      <div className="bg-white pb-10  py-5 px-4">
        <h2 className="text-3xl text-center font-semibold">
          Get Started with Uber{" "}
        </h2>
        <Link
          to="/login"
          className="flex items-center justify-center bg-black text-white text-2xl w-full py-3 rounded-md mt-4"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
