import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/base/Navbar";
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
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  const user = JSON.parse(window?.localStorage?.getItem("user"));
  console.log("🚀 ~ file: index.js:20 ~ AppRoutes ~ user", user);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/volunteer" element={<VolunteerHome />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/admin/login" element={<LogIn />} />
        {user?.role == "admin" && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/volunteers" element={<Volunteers />} />
          </>
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
