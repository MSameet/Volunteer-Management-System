import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../components/base/Navbar";
import { Events } from "../components/pages/Events";
import { Home } from "../components/pages/Home";
import { LogIn } from "../components/pages/LogIn";
import { Profile } from "../components/pages/Profile";
import { Signup } from "../components/pages/Signup";
import SingleEvent from "../components/pages/SingleEvent";
import { VolunteerHome } from "../components/pages/VolunteerHome";
import { PrivateRoute } from "./PrivateRoute";

export const DefaultRoutes = () => {
  let { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="app__container">
      {!(pathname == "/login" || pathname == "/signup") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<SingleEvent />} />
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
    </div>
  );
};
