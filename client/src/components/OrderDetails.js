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
      const result = await removeOrder({
        orderID: order._id,
        jwt: JSON.parse(localStorage.jwt),
      });
      afterClick(result.data);
      await getOrders(dispatch);
      return;
    } else {
      document.querySelector("#delete-error").style.display = "block";
      document.querySelector("#delete-error").textContent =
        "Clicking on a order deletes the order. You must be an admin to delete an order";
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
      <div className="title">{capital_letter(order.name)}</div>
      <div className="noOfOrder">
        {order.noOfOrders} {order.orderType === "Fura" ? "Fura" : "Nunu"}
        {order.noOfOrders > 1 ? " Bottles" : " Bottle"}
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

function capital_letter(str) {
  str = str.split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

function afterClick(str) {
  document.querySelector("#delete-error").style.display = "block";
  document.querySelector("#delete-error").textContent = str;
  setTimeout(() => {
    document.querySelector("#delete-error").style.display = "none";
  }, 3000);
}

export default OrderDetails;
