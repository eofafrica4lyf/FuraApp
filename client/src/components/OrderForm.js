import React, { useState, useContext, useEffect } from "react";
import { OrderContext } from "../contexts/orderContext";
import addOrder from "../APIservice/addOrder";
import getOrders from "../APIservice/getOrders";

function OrderForm() {
  const { dispatch } = useContext(OrderContext);
  const [name, setName] = useState(() => {
    if (localStorage.jwt) {
      return JSON.parse(localStorage.jwt).name;
    } else {
      return "";
    }
  });
  const [noOfOrders, setNoOfOrders] = useState(1);
  const [orderType, setOrderType] = useState("Fura");
  const [errors, setErrors] = useState("");

  const handleOrderFormSubmit = async e => {
    e.preventDefault();
    if (name.length <= 3) {
      setErrors("Please input a valid full name with at least 3 characters");
      document.querySelector("#name").focus();
      document.querySelector("#name").select();
      return;
    }
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
      setErrors("Please input your full name");
      document.querySelector("#name").focus();
      document.querySelector("#name").select();
      return;
    }
    if (name.length > 30) {
      setErrors("Please input a valid full name with 30 characters or less");
      document.querySelector("#name").focus();
      document.querySelector("#name").select();
      return;
    }
    if (noOfOrders === 0) {
      setErrors("You must specify the number of bottles to be ordered");
      document.querySelector("#noOfOrders").focus();
      document.querySelector("#noOfOrders").select();
      return;
    }
    if (noOfOrders > 10) {
      setErrors("You can only order up to 10 bottles");
      document.querySelector("#noOfOrders").focus();
      document.querySelector("#noOfOrders").select();
      return;
    }
    if (parseInt(noOfOrders) !== parseFloat(noOfOrders)) {
      setErrors("Please enter a valid input");
      document.querySelector("#noOfOrders").focus();
      document.querySelector("#noOfOrders").select();
      return;
    }

    document.querySelector("#name").disabled = true;
    document.querySelector("#noOfOrders").disabled = true;
    const payload = {
      name,
      noOfOrders,
      orderType,
      createdAt: new Date(),
    };
    let payloadd;

    if (localStorage.jwt) {
      const { id } = JSON.parse(localStorage.jwt);
      payloadd = { userId: id, ...payload };
    } else {
      payloadd = { userId: null, ...payload };
    }
    await addOrder(payloadd);
    await getOrders(dispatch);

    setNoOfOrders(0);
    setName("");
    document.querySelector("#name").disabled = false;
    document.querySelector("#noOfOrders").disabled = false;
    document.querySelector("#name").focus();
    document.querySelector("#name").select();
  };

  const nameFieldHandler = e => {
    setName(e.target.value);
  };

  const orderFieldHandler = e => {
    setNoOfOrders(e.target.value);
  };

  const orderTypeHandler = e => {
    setOrderType(e.target.value);
  };

  useEffect(() => {
    if (name.length > 3 || name.length <= 15) {
      setErrors("");
    }
  }, [name]);

  useEffect(() => {
    if (
      typeof parseInt(noOfOrders) !== "number" ||
      isNaN(parseInt(noOfOrders))
    ) {
      setNoOfOrders("");
      setErrors("Please provide a number as the no of Orders...");
    } else {
      setErrors("");
    }
  }, [noOfOrders]);

  return (
    <form onSubmit={handleOrderFormSubmit}>
      <div className="error">{errors}</div>
      <input
        id="name"
        type="text"
        placeholder="Your Name..."
        value={name}
        onChange={nameFieldHandler}
      />
      <input
        id="noOfOrders"
        type="text"
        placeholder="How many Fura bottles"
        value={noOfOrders}
        onChange={orderFieldHandler}
      />
      <select
        value={orderType}
        onChange={orderTypeHandler}
        name="OrderType"
        id="ordertype"
      >
        <option value="Fura">Fura #200</option>
        <option value="Nunu">Nunu (Milk) #200</option>
      </select>
      <input type="submit" value="Add order" />
    </form>
  );
}

export default OrderForm;
