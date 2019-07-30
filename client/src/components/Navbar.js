import React, { useContext, useEffect, useCallback, useState } from "react";
import { OrderContext } from "../contexts/orderContext";
import { Link } from "react-router-dom";

function Navbar() {
  let { orders } = useContext(OrderContext);
  let [list, setList] = useState([]);

  const resolveOrders = useCallback(async () => {
    let ordersList = await orders;
    setList(ordersList);
  }, [orders]);

  useEffect(() => {
    resolveOrders();
  }, [orders, resolveOrders]);

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
      <p>
        {list.length || "No"}{" "}
        {list.length > 1 ? "orders waiting" : "order waiting"}
      </p>
    </div>
  );
}

export default Navbar;
