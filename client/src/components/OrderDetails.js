import React, { useContext } from "react";
import { OrderContext } from "../contexts/orderContext";
import removeOrder from "../APIservice/removeOrder";
import getOrders from "../APIservice/getOrders";

function OrderDetails({ order }) {
  const { dispatch } = useContext(OrderContext);
  // console.log(order);
  // console.log(JSON.parse(localStorage.jwt));

  const handleOrderRemoval = async e => {
    if (localStorage.jwt) {
      await removeOrder({
        orderID: order._id,
        jwt: JSON.parse(localStorage.jwt),
      });
      await getOrders(dispatch);
    } else {
      document.querySelector("#delete-error").style.display = "block";
      setTimeout(() => {
        document.querySelector("#delete-error").style.display = "none";
      }, 3000);
      return;
    }
  };

  return (
    <li
      id={order._id}
      style={{ margin: "5px", padding: "5px" }}
      onClick={handleOrderRemoval}
    >
      <div className="title">{order.name}</div>
      <div className="noOfOrder">
        {order.noOfOrders}{" "}
        {order.noOfOrders > 1 ? "Fura Bottles" : "Fura Bottle"}
      </div>
    </li>
  );
}

export default OrderDetails;
