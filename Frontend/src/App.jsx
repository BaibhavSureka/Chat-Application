import React from "react";
import { Left } from "./home/Left/Left.jsx";
import Right from "./home/Right/Right.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import { useAuth } from "./context/AuthProvider.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Left></Left>
                <Right></Right>
              </div>
            ) : (
              <Navigate to="login" />
            )
          }
        ></Route>

        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
