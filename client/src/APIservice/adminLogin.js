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
    localStorage.setItem("jwt", JSON.stringify(result));
    return result;
  } catch (err) {
    console.error(err);
  }
};

export default adminLogin;
