import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { isLoggedIn: false, email: null, role: null };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser({
      isLoggedIn: true,
      email: userData.email,
      role: userData.role,
    });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, email: null, role: null });
    localStorage.removeItem("user"); 
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);