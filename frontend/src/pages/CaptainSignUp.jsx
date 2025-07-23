import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainSignUp = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  // const [UserData, setUserData] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstName: FirstName,
        lastName: LastName,
      },

      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      CaptainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    console.log(CaptainData);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  };
  return (
    <div>
      <div className="p-5 h-screen bg-[#eeee] flex flex-col  justify-between">
        <div>
          <img
            className="w-[45px] "
            src="https://pngimg.com/d/uber_PNG24.png"
            alt=""
            srcset=""
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-2xl my-3 font-medium  ">Captain Name</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={FirstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-md py-3 px-4 my- bg-zinc-200 w-1/2 flex justify-center text-lg outline-none placeholder:text-base"
                placeholder="First Name"
              />
              <input
                type="text"
                required
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-md py-3 px-4 my- bg-zinc-200 w-1/2 flex justify-center text-lg outline-none placeholder:text-base"
                placeholder="Last Name"
              />
            </div>
            <h3 className="text-2xl my-3 font-medium  ">What's your email</h3>
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
              className="rounded-md py-3 px-4 my-4 bg-zinc-200 w-full flex justify-center text-lg outline-none  placeholder:text-base"
              placeholder="password"
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-5">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value);
                }}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <button className="flex items-center justify-center bg-black text-white text-2xl w-full py-3 rounded-md mt-4 font-medium">
              Create account
            </button>
          </form>
          <p className="text-center text-sm mt-2">
            You already have account Captain ?
            <Link to="/captain-login" className="text-blue-600 ml-2">
              Login here
            </Link>
          </p>
        </div>
        <p className="text-center text-[10px] text-wrap leading-3 tracking-tight">
          We respect your privacy. By creating an account, you accept our
          Privacy Policy and Terms & Conditions. Your information stays safe
          with us — no spam, ever.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
