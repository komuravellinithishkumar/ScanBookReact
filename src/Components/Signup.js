import { useState, useContext } from "react";
import { API_URL } from "./Globals";
import Header from "./Header";
import { useNavigate, redirect } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstname.toString(),
        lastName: lastname.toString(),
        email: email.toString(),
        password: password.toString(),
      }),
    };
    fetch(`${API_URL}/signUp`, options)
      .then(function (response) {
        console.log("Response", response);

        response.json().then(function (value) {
          console.log("JSON", value);
          console.log("valuececk", value.created);

          if (value.status != 200) {
            alert("failure");
          } else if (value.created == true) {
            let today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * 24 * 15);
            navigate("/login");
          } else if (value.created == false) {
            alert("User Already Exists");
            let today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * 24 * 15);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("Signup form submitted!");
  };

  const sub = async () => {
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div>
        <Header />
      </div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">FirstName:</label>
          <input
            type="String"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">LastName:</label>
          <input
            type="String"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
export default Signup;
