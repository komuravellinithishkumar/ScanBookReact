import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./Context";
import "./Header.css";

const Header = () => {
  const ctx = useContext(AuthContext);
  const storedName = ctx.email;

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {storedName ? (
            <li>
              <Link to="/" onClick={() => ctx.isLogout()}>
                {" "}
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {storedName ? (
            ""
          ) : (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
