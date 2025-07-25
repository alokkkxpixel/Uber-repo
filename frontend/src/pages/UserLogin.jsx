import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({});

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        console.log("Login failed. Server responded with:", response);
      }
      console.log(response.status);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check credentials or backend connection.");
    }
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
          <Link to="/signup" className="text-blue-600 ml-2">
            Create new Account
          </Link>
        </p>
      </div>
      <div className="mb-5">
        <Link
          to="/captain-login"
          className="flex items-center justify-center bg-green-600 text-white text-2xl w-full py-3 rounded-md mb-5 font-medium"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
