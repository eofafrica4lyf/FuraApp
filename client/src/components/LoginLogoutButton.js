import React, { useContext, useEffect } from "react";
import { authContext } from "../contexts/authContext";

function LoginLogoutButton() {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  const handleLogout = e => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.jwt) {
      setIsLoggedIn(true);
    }
  });

  return isLoggedIn ? (
    <div
      id="logout"
      style={{
        float: "right",
        position: "absolute",
        right: "30px",
        top: "15px",
      }}
    >
      <button onClick={handleLogout} id="logout">
        Logout
      </button>
    </div>
  ) : (
    <div> </div>
  );
}

export default LoginLogoutButton;
