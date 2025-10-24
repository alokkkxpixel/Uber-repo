import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  console.log(user);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstName:FirstName,
        lastName:LastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <div className="p-5 h-screen bg-[#eeee] flex flex-col  justify-between">
      <div>
        <img
          className="w-20 "
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
          srcset=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-2xl my-5 font-medium  ">What's your Name</h3>
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-2">
          Already have Account?
          <Link to="/login" className="text-blue-600 ml-2">
            Login here
          </Link>
        </p>
      </div>
      <p className="text-center text-[10px] text-wrap leading-3 tracking-tight">
        We respect your privacy. By creating an account, you accept our Privacy
        Policy and Terms & Conditions. Your information stays safe with us — no
        spam, ever.
      </p>
    </div>
  );
};

export default UserSignup;
