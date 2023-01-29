import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "../components/base/Navbar";
import { AdminDrawer } from "../components/pages-components/AdminDrawer";
import { AdminToolbar } from "../components/pages-components/AdminToolbar";
import { Admin } from "../components/pages/Admin";
import { AdminLogin } from "../components/pages/AdminLogin";
import { CreateEvent } from "../components/pages/CreateEvent";
import { Events } from "../components/pages/Events";
import { Home } from "../components/pages/Home";
import { LogIn } from "../components/pages/LogIn";
import { NotFound } from "../components/pages/NotFound";
import { Profile } from "../components/pages/Profile";
import { Signup } from "../components/pages/Signup";
import { VolunteerHome } from "../components/pages/VolunteerHome";
import { Volunteers } from "../components/pages/Volunteers";
// import { AdminRoute } from "./AdminRoute";
import { PrivateRoute } from "./PrivateRoute";
import { VolunteerRoute } from "./VolunteerRoute";

export const AppRoutes = () => {
  const user = JSON.parse(window?.localStorage?.getItem("user"));
  console.log("🚀 ~ file: index.js:20 ~ AppRoutes ~ user", user);
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/volunteer" element={<VolunteerHome />} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/admin/login" element={<LogIn />} />
        </Routes>
        {user?.role == "admin" && (
          <>
            <AdminDrawer toggleDrawer={toggleDrawer} state={state} />
            <AdminToolbar toggleDrawer={toggleDrawer} />
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/volunteers" element={<Volunteers />} />
            </Routes>
          </>
        )}
        {/* <Routes>
          <Route path="/*" element={<NotFound />} />
        </Routes> */}
      </Router>
    </div>
  );
};
