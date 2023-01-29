import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = window.localStorage.getItem("token");
  console.log(isAuth);
  return <div>{isAuth ? children : <Navigate to="/login" />}</div>;
};
