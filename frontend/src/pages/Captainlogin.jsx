import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CaptainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault(),
      setCaptainData({
        email: email,
        password: password,
      });
    console.log(CaptainData);
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="p-5 h-screen bg-[#eeee] flex flex-col  justify-between">
        <div>
          <img
            className="w-20 "
            src="https://pngimg.com/d/uber_PNG24.png"
            alt=""
            srcset=""
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-2xl my-5 font-medium  ">What's your email</h3>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md py-3 px-4 my-3 bg-zinc-200 w-full flex justify-center text-lg outline-none placeholder:text-base"
              placeholder="youremail@example.com"
            />
            <h3 className="text-2xl my-5 font-medium ">Enter the password</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md py-3 px-4 my-5 bg-zinc-200 w-full flex justify-center text-lg outline-none  placeholder:text-base"
              placeholder="password"
            />
            <button className="flex items-center justify-center bg-black text-white text-2xl w-full py-3 rounded-md mt-4 font-medium">
              Login
            </button>
          </form>
          <p className="text-center mt-2">
            New here?
            <Link to="/captain-signup" className="text-blue-600 ml-2">
              Register as new Captain Account
            </Link>
          </p>
        </div>
        <div className="mb-5">
          <Link
            to="/login"
            className="flex items-center justify-center bg-blue-500 text-white text-2xl w-full py-3 rounded-md mb-5 font-medium"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Captainlogin;
