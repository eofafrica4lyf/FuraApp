import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/orderContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { orders } = useContext(OrderContext);
  console.log(orders);

  return (
    <div className="navbar">
      <h1>
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          THe FURA aPP
        </a>
        <span>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to="/admin"
          >
            ®
          </Link>
        </span>
      </h1>
      <p>There are currently {orders.length || "no"} orders</p>
    </div>
  );
}

export default Navbar;
