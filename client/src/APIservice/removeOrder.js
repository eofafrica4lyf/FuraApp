const removeOrder = async payload => {
  const data = await fetch(`http://localhost:3200/api/orders/removeOrder`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Accept-Charset": "utf-8",
    },
    body: JSON.stringify(payload),
  });
  let result = await data.json();
  result = await result.data;
  console.log({ result });
};

export default removeOrder;
