import { AppBar, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/i/logo.jpeg";
import AccountMenu from "../pages-components/AccountMenu";

export const Navbar = () => {
  const { user } = useSelector((state) => state?.userReducer);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        if (window.pageYOffset > 50) {
          setActive(true);
        } else {
          setActive(false);
        }
      },
      false
    );
  }, [active]);
  return (
    <AppBar position={active ? "fixed" : "static"} className="header">
      <Container fixed className="header_container" height="100%">
        <div className="header__inner-container">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
          <ul className="navbar">
            <li className="nav_items">
              <Link
                to="/"
                className={`nav_link ${pathname == "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav_items">
              <Link
                to="/events"
                className={`nav_link ${pathname == "/events" ? "active" : ""}`}
              >
                Events
              </Link>
            </li>
            <li className="nav_items">
              <Link
                to="/volunteer"
                className={`nav_link ${
                  pathname == "/volunteer" ? "active" : ""
                }`}
              >
                Volunteers
              </Link>
            </li>
            {user && user.role == "Volunteer" && (
              <li className="nav_items">
                <Link
                  to="/profile"
                  className={`nav_link ${
                    pathname == "/profile" ? "active" : ""
                  }`}
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
          <div className="header__logoinbtn">
            {user?.role == "volunteer" ? (
              <AccountMenu />
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
