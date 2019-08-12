import React, { createContext, useState } from "react";

export const authContext = createContext();

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
