const adminLogin = async payload => {
  try {
    const data = await fetch(`/api/admin/login`, {
      method: "POST",
      headers: {
        mode: "cors",
        "Content-type": "application/json",
        "Accept-Charset": "utf-8",
      },
      body: JSON.stringify(payload),
    });
    let result = await data.json();
    console.log("result");
    localStorage.setItem("jwt", JSON.stringify(result));
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export default adminLogin;
