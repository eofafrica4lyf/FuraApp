import React, { useState, useContext, useEffect } from "react";
import { OrderContext } from "../contexts/orderContext";
import addOrder from "../APIservice/addOrder";
import getOrders from "../APIservice/getOrders";

function OrderForm() {
  const { dispatch } = useContext(OrderContext);
  const [name, setName] = useState("");
  const [noOfOrders, setNoOfOrders] = useState(0);
  const [errors, setErrors] = useState("");

  const handleOrderFormSubmit = async e => {
    e.preventDefault();
    if (name.length <= 3) {
      setErrors("Please input a valid full name with at least 3 characters");
      document.querySelector("#name").focus();
      document.querySelector("#name").select();
      return;
    }
    if (
      !/^(?<title>.*\.\s)*(?<firstname>([A-Z][a-z]+\s*)+)(\s)(?<lastname>[A-Z][a-zA-Z-']+)$/.test(
        name
      )
    ) {
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
    console.log(name, noOfOrders);
    const payload = {
      name,
      noOfOrders,
      createdAt: new Date(),
    };

    await addOrder(payload);
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

  useEffect(() => {
    if (name.length > 3 || name.length <= 15) {
      setErrors("");
    }
  }, [name]);

  useEffect(() => {
    console.log(noOfOrders);

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
      <input type="submit" value="Add order" />
    </form>
  );
}

export default OrderForm;
