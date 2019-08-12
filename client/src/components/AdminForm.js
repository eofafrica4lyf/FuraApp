import React, { useState, useContext } from "react";
import adminLogin from "../APIservice/adminLogin";
import { authContext } from "../contexts/authContext";

function AdminForm({ passed }) {
  const [loginErrors, setLoginErrors] = useState("");
  const { setIsLoggedIn } = useContext(authContext);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setPasswordHandler] = useState("");

  const handleAdminLogin = async e => {
    e.preventDefault();
    console.log("User is attempting to login");

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        adminEmail
      )
    ) {
      setLoginErrors("Please input a valid email");
      document.querySelector("#email").focus();
      document.querySelector("#email").select();
      return;
    }

    const result = await adminLogin({
      email: adminEmail,
      password: adminPassword,
    });
    if (result.message === "Invalid email or password") {
      return;
    }
    console.log("You are logged in");

    setIsLoggedIn(true);
    passed.history.push("/");
  };
  const adminEmailHandler = e => {
    setAdminEmail(e.target.value);
  };
  const adminPasswordHandler = e => {
    setPasswordHandler(e.target.value);
  };
  return (
    <form onSubmit={handleAdminLogin}>
      <div className="error">{loginErrors}</div>
      <label htmlFor="email" style={{ textAlign: "left", display: "block" }}>
        Email Address
      </label>
      <input
        id="email"
        type="text"
        placeholder="Email..."
        value={adminEmail}
        onChange={adminEmailHandler}
      />
      <label htmlFor="email" style={{ textAlign: "left", display: "block" }}>
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password ..."
        value={adminPassword}
        onChange={adminPasswordHandler}
      />
      <input type="submit" value="Login" />
    </form>
  );
}

export default AdminForm;
