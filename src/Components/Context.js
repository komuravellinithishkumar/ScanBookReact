import { useState, createContext, useEffect } from "react";
const AuthContext = createContext({
  isAuthenticated: () => false,
  setAuthInfo: (email, firstName, lastName) => {},
  isLogout: () => {},
});
const { Provider } = AuthContext;
const Authprovider = ({ children }) => {
  let email = localStorage.getItem("email");
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  const [userData, setUserData] = useState({
    email,
    firstName,
    lastName,
  });

  const isAuthenticated = () => {
    if (!userData.email) {
      return false;
    }
    return true;
  };
  const isLogout = () => {
    localStorage.removeItem("email");
    setUserData({ email: "", firstName: "", lastName: "" });
  };
  const setAuthInfo = (email, firstName, lastName) => {
    localStorage.setItem("email", email);
    localStorage.setItem("first Name", firstName);
    localStorage.setItem("last Name", lastName);

    setUserData({
      email,
      firstName,
      lastName,
    });
    console.log("values are", userData);
  };

  return (
    <Provider
      value={{
        setAuthInfo,
        isAuthenticated,
        email: userData.email,
        isLogout,
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, Authprovider };
