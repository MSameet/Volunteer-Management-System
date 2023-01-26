import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = (children) => {
  const isAuth =
    useSelector((state) => state.useReducer.token) ||
    window.localStorage.getItem("token");
  return <div>{!isAuth ? <Navigate to="/login" /> : children}</div>;
};
