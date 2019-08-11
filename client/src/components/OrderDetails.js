import React, { useContext } from "react";
import { OrderContext } from "../contexts/orderContext";
import removeOrder from "../APIservice/removeOrder";
import getOrders from "../APIservice/getOrders";
import green_blinking_light from "../img/blinking_green.gif";

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
      style={{
        margin: "5px",
        padding: "10px",
        position: "relative",
        textAlign: "left",
      }}
      onClick={handleOrderRemoval}
    >
      <div className="title">{order.name}</div>
      <div className="noOfOrder">
        {order.noOfOrders}{" "}
        {order.noOfOrders > 1 ? "Fura Bottles" : "Fura Bottle"}
      </div>
      <div
        className="date-time"
        style={{
          position: "absolute",
          top: "25%",
          right: "30px",
          fontSize: "0.7em",
          paddingRight: "1em",
        }}
      >
        <div style={{ textAlign: "left" }}>
          {
            new Date(order.createdAt)
              .toLocaleDateString("en-GB", {
                second: "2-digit",
                minute: "2-digit",
                hour: "2-digit",
              })
              .split(",")[1]
          }
        </div>
        <div style={{ textAlign: "left" }}>
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        {/* {new Date(order.createdAt).getHours() +
          ":" +
          order.createdAt.getMinutes()} */}
      </div>
      <div style={{ position: "absolute", top: "25%", right: "10px" }}>
        <img
          src={green_blinking_light}
          alt="Green Blinking Light"
          style={{ width: "10px", height: "10px" }}
        />
      </div>
    </li>
  );
}

export default OrderDetails;
