import jws from "jws-jwk";

const googleLogin = async payload => {
  try {
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${payload.Zi.id_token}`,
      {
        method: "GET",
        headers: {
          mode: "no-cors",
          Origin: "http://localhost:3000",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-type": "application/json",
          "Accept-Charset": "utf-8",
        },
        // body: JSON.stringify(payload),
      }
    );
    let result = await data.json();
    console.log("token");
    console.log(result); //User info

    const data1 = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/oauth2/v2/certs`,
      {
        method: "GET",
        headers: {
          mode: "no-cors",
          Origin: "http://localhost:3000",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-type": "application/json",
          "Accept-Charset": "utf-8",
        },
        // body: JSON.stringify(payload),
      }
    );
    let result1 = await data1.json();
    console.log("result");
    console.log(result1);

    const jwk = result1.keys.filter(value => value.kid === result.kid)[0];
    console.log(jwk);

    console.log(payload.Zi.id_token, jwk);

    const verify = jws.verify(payload.Zi.id_token, jwk);
    console.log(verify);
    if (!verify) {
      return false;
    } else {
      const data = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          mode: "cors",
          "Content-type": "application/json",
          "Accept-Charset": "utf-8",
        },
        body: JSON.stringify(result),
      });
      let result2 = await data.json();
      console.log("result2");
      console.log(result2);
      return result2;
      // localStorage.setItem("jwt", JSON.stringify(result));
    }
  } catch (err) {
    console.error(err);
  }
};

export default googleLogin;
