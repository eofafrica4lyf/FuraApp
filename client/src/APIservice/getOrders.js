const getOrders = async dispatch => {
  try {
    let data = await fetch(`http://localhost:3200/api/orders/`, {
      method: "GET",
      headers: {
        mode: "cors",
        "Content-type": "application/json",
        "Accept-Charset": "utf-8",
      },
    });
    let result = await data.json();
    dispatch({
      type: "ON_LOAD",
      payload: [...result],
    });
  } catch (err) {
    console.log({ err });
  }
};

export default getOrders;
