import React, { createContext, useEffect, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(
    JSON.parse(localStorage.getItem("captain")) || {}
  );

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (captain && Object.keys(captain).length > 0) {
      localStorage.setItem("captain", JSON.stringify(captain));
    }
  }, [captain]);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setisLoading,
    error,
    setError,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
 