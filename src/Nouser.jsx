import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Component/context/AuthContext";
import Login from "./Login";

function Nouser() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/Dashboard" /> : <Login />;
}

export default Nouser;
