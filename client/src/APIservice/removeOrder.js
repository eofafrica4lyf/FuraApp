const removeOrder = async payload => {
  const data = await fetch(`/api/orders/removeOrder`, {
    method: "PUT",
    headers: {
      mode: "cors",
      "Content-type": "application/json",
      "Accept-Charset": "utf-8",
      "x-auth-token": payload.jwt.token,
    },
    body: JSON.stringify(payload),
  });
  let result = await data.json();
  // result = await result.data;
  console.log("result from backend");
  console.log(result);
  return result;
};

export default removeOrder;
