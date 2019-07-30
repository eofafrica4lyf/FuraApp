import React, { useState } from "react";

function AdminForm() {
  const [loginErrors, setLoginErrors] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setPasswordHandler] = useState("");

  const handleAdminLogin = () => {};
  const adminEmailHandler = e => {
    setAdminEmail(e.target.value);
  };
  const adminPasswordHandler = e => {
    setPasswordHandler(e.target.value);
  };
  return (
    <form onSubmit={handleAdminLogin}>
      <div className="error">{loginErrors}</div>
      <input
        id="email"
        type="text"
        placeholder="Email..."
        value={adminEmail}
        onChange={adminEmailHandler}
      />
      <input
        id="password"
        type="text"
        placeholder="Password ..."
        value={adminPassword}
        onChange={adminPasswordHandler}
      />
      <input type="submit" value="Login" />
    </form>
  );
}

export default AdminForm;
