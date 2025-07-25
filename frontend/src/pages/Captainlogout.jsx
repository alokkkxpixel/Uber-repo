import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Captainlogout = () => {
 const navigate = useNavigate();
 const token = localStorage.getItem("token");

 axios
   .get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
     if (response.status === 200) {
       localStorage.removeItem("token");
       navigate("/login");
     }
   });

  return <div>Captainlogout</div>;
};

export default Captainlogout;
