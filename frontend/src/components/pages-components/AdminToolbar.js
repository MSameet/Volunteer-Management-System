import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/userReducer";
import { Navigate, useNavigate } from "react-router-dom";

export const AdminToolbar = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer("left", true)}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Admin
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("token");
          dispatch(logout());
          navigate("/");
        }}
      >
        Logout
      </Button>
    </Toolbar>
  );
};
