import React, { useContext } from "react";
import { authContext } from "../contexts/authContext";
// import { Component } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import googleLogin from "../APIservice/googleLogin";
import GoogleLogin from "react-google-login";
import dotenv from "dotenv";

dotenv.config();

function Home(props) {
  const { userInfo, setUserInfo, setIsLoggedIn } = useContext(authContext);

  const responseGoogle = async response => {
    const result = await googleLogin(response);
    if (!result) return;
    localStorage.setItem("jwt", JSON.stringify(result));
    setUserInfo(result);
    setIsLoggedIn(true);
    props.history.push("/");
  };

  const handleSignInForUser = e => {};
  return (
    <>
      {
        <div
          id="loggedIn"
          style={{ padding: "1em", textDecoration: "underline" }}
        >
          {localStorage.jwt ? (
            `Welcome ${JSON.parse(localStorage.jwt).name}`
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              onClick={handleSignInForUser}
            />
          )}
        </div>
      }
      <OrderForm />
      <OrderList />
    </>
  );
}

export default Home;
