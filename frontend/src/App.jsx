import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import Captainlogout from "./pages/Captainlogout";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/logout" element={<UserLogout />} />

        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-logout" element={<Captainlogout />} />
      </Routes>
    </div>
  );
};

export default App;
