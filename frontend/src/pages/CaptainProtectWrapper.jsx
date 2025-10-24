import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchCaptain = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200 && response.data?.captain) {
          setCaptain(response.data.captain);
        }
      } catch (err) {
        console.error("Error fetching captain:", err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptain();
  }, [token, navigate, setCaptain]);

  // Wait for profile to finish loading before rendering children
  if (isLoading) {
    return <div>Loading captain data...</div>;
  }

  // Navigate to captain home only if you're not already there
  if (captain && location.pathname !== "/captain-home") {
    navigate("/captain-home");
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
