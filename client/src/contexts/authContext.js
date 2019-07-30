import React, { createContext, useState } from "react";

export const authContext = createContext();

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
