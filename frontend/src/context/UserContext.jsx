import React, { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
const storedUser = JSON.parse(localStorage.getItem("user")) || {
  email: "",
  fullName: { firstName: "", lastName: "" },
};

const [user, setUser] = useState(storedUser);

// Whenever user changes, update localStorage
useEffect(() => {
  if (user && user.email) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}, [user]);


  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
