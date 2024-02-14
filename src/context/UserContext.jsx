import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserValid, setIsUserValid] = useState(false);

  function handleLogout() {
    localStorage.setItem("todouservalid", false);
    setIsUserValid(false);
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    const data = localStorage.getItem("todouser");
    const isUser = JSON.parse(localStorage.getItem("todouservalid"));

    if (isUser !== null) {
      setIsUserValid(isUser);
    }

    if (data !== null) {
      setUser(JSON.parse(data));
    }
  }, [isUserValid]);

  return (
    <UserContext.Provider
      value={{ user, isUserValid, setIsUserValid, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
