import { useState, useContext } from "react";
import { AuthContext } from "./Context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { API_URL } from "./Globals";
import { useNavigate, redirect } from "react-router-dom";
import Home from "./Home";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const ctx = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toString(),
        password: password.toString(),
      }),
    };

    fetch(`${API_URL}/login`, options)
      .then(function (response) {
        console.log("Response", response);

        response.json().then(function (value) {
          console.log("JSON", value);

          if (value.status != 200) {
            alert("failure");
          } else {
            ctx.setAuthInfo(value.email);
            navigate("/");
            // ReactDOM.render(<Home />, document.getElementById("root"));
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="root" className="login-page">
      <div id="head">
        <Header />
      </div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
