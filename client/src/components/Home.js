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
    console.log(response);

    const result = await googleLogin(response);
    if (!result) return;
    console.log(result);
    localStorage.setItem("jwt", JSON.stringify(result));
    setUserInfo(result);
    setIsLoggedIn(true);
    props.history.push("/");
  };

  const handleSignInForUser = e => {
    console.log(e.target);
  };
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
      {/* <div>Welcome {}</div> */}
      <OrderForm />
      <OrderList />
      {/* <LoginButton   onClick={handleSignInForUser} /> */}
    </>
  );
}

export default Home;

// class LoginButton extends Component {
//   render() {
//     const responseGoogle = response => {
//       console.log(response);
//     };
//     return (
//       <GoogleLogin
//         clientId="294149933359-4677pimujeb4o39caqn8qkua37vr6vh0.apps.googleusercontent.com"
//         buttonText="LOGIN WITH GOOGLE"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//       />
//     );
//   }
// }
