import React, { createContext, useState } from "react";
// import { CaptainDataContext } from "./captainContext.utils";

export const CaptainDataContext = createContext();


  
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

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
