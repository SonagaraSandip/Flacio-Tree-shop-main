import React, { createContext, useContext, useState } from "react";

// store user in localstorage
const getUser = () => JSON.parse(localStorage.getItem("user") || "[] ");
const setUsers = (users) => localStorage.setItem("user", JSON.stringify(users));

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const register = (firstName, lastName, email, password) => {
    let users = getUser();
    if (users.some((u) => u.email === email)) {
      return { error: "Email already Registered!" };
    }

    const newUser = { firstName, lastName, email, password };
    users.push(newUser);
    setUsers(users);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return { success: true };
  };

  const login = (email, password) => {
    let users = getUser();

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      if (users.find((u) => u.email === email)) {
        return { error: "Incorrect Password!" };
      }
      return { error: "Create an Account!" };
    }
    setUser(found);
    localStorage.setItem("currentUser", JSON.stringify(found));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
