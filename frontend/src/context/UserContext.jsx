import React, { createContext } from "react";
import { useState } from "react";
// import { UserDataContext } from "./UserDataContext";

const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname: {
      FirstName: "",
      LastName: "",
    },
    email: "",
    password: "",
  });

  return (
    <div>
      <UserDataContext.Provider value={[user, setUser]}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
