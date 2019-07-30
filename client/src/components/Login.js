import React from "react";
import AdminForm from "./AdminForm";

function Login(props) {
  return (
    <>
      <h1>Admin Login Page</h1>
      <AdminForm passed={props} />
    </>
  );
}

export default Login;
