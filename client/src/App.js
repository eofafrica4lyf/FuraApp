import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import OrderContextProvider from "./contexts/orderContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <OrderContextProvider>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Login} />
        </OrderContextProvider>
      </div>
    </Router>
  );
}

export default App;
