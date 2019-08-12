import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import OrderContextProvider from "./contexts/orderContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthContextProvider from "./contexts/authContext";
import LoginLogoutButton from "./components/LoginLogoutButton";
import ChangeLog from "./components/changelog";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <OrderContextProvider>
          <AuthContextProvider>
            <Navbar />
            <LoginLogoutButton />
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Login} />
            <Route path="/log" component={ChangeLog} />
          </AuthContextProvider>
        </OrderContextProvider>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link
          style={{
            color: "#260027",
            textDecoration: "none",
          }}
          to="/log"
        >
          <em>*Change log</em>
        </Link>
      </div>
    </Router>
  );
}

export default App;
