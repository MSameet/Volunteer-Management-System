import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/i/logo.png";
import { logout } from "../../redux/reducer/userReducer";

export const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  console.log("🚀 ~ file: Navbar.js:17 ~ Navbar ~ user", user);

  // const role = window.localStorage.getItem("admin");

  const dispatch = useDispatch();
  return (
    <AppBar position="fixed" className="header">
      <Container fixed className="header_container" height="100%">
        <div className="header__inner-container">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
          <ul className="navbar">
            <li className="nav_items">
              <Link to="/" className="nav_link">
                Home
              </Link>
            </li>
            <li className="nav_items">
              <Link to="/events" className="nav_link">
                Events
              </Link>
            </li>
            <li className="nav_items">
              <Link to="/volunteer" className="nav_link">
                Volunteers
              </Link>
            </li>

            <li className="nav_items">
              {user?.role == "admin" ? (
                <Link to="/admin" className="nav_link">
                  Admin
                </Link>
              ) : (
                <Link to="/admin/login" className="nav_link">
                  Admin
                </Link>
              )}
            </li>
          </ul>
          <div className="header__logoinbtn">
            {user && user?.role == "Volunteer" ? (
              <Box
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Avatar alt={user?.name} src={user?.avatar} />
                <Typography>{user?.name}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    window.localStorage.removeItem("user");
                    window.localStorage.removeItem("token");
                    dispatch(logout());
                    setUser("");
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button variant="outlined" href="/login">
                Login
              </Button>
            )}
          </div>
        </div>
      </Container>
    </AppBar>
  );
};
