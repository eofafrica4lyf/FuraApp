import React, { createContext, useReducer, useEffect } from "react";
import { orderReducer } from "../reducers/orderReducer";

import getOrders from "../APIservice/getOrders";
export const OrderContext = createContext();

const OrderContextProvider = props => {
  const [orders, dispatch] = useReducer(orderReducer, []);

  useEffect(() => {
    if (window.location.pathname === "/") {
      getOrders(dispatch);
      document.querySelector("#name").focus();
      document.querySelector("#name").select();
    } else {
    }
  }, []);
  return (
    <OrderContext.Provider value={{ orders, dispatch }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
