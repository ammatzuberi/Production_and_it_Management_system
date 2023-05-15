import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Component/context/AuthContext";

import Signup from "./Signup";

function Signup_validation() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/Dashboard" /> : <Signup />;
}

export default Signup_validation;
