import React, { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
const Events = lazy(() => import("../components/pages/Events"));
const LogIn = lazy(() => import("../components/pages/LogIn"));
const EditProfile = lazy(() => import("../components/pages/EditProfile"));
const Profile = lazy(() => import("../components/pages/Profile"));

const Signup = lazy(() => import("../components/pages/Signup"));
const Navbar = lazy(() => import("../components/base/Navbar"));
const Home = lazy(() => import("../components/pages/Home"));
const VolunteerRequest = lazy(() =>
  import("../components/pages/VolunteerRequest")
);
const SingleEvent = lazy(() => import("../components/pages/SingleEvent"));
const Footer = lazy(() => import("../components/base/Footer"));

export const DefaultRoutes = () => {
  let { pathname } = useLocation();
  return (
    <div className="app__container">
      {!(pathname == "/login" || pathname == "/signup") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<VolunteerRequest />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<SingleEvent />} />
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
      {!(pathname == "/login" || pathname == "/signup") && <Footer />}
    </div>
  );
};
