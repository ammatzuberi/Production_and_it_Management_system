import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Component/context/AuthContext";

export default function PrivateRouter() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
