import { createContext, useContext, useState, useEffect } from "react";

// const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  function signup(userUsername) {
    fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userUsername,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setToken(json.token);
        setLocation("TABLET");
      })
      .catch((err) => {
        console.log(err);
        console.log("error POSTING data");
      });
  }

  function authenticate() {
    if (!token) {
      throw new Error("no value at token");
    }
    fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setLocation("TUNNEL");
      })
      .catch((err) => {
        console.log(err);
        console.log("error GETTING data");
      });
  }

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
