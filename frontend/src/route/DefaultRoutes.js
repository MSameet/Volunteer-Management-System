import React, { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
const Events = lazy(() => import("../components/pages/Events"));
const LogIn = lazy(() => import("../components/pages/LogIn"));
const EditProfile = lazy(() => import("../components/pages/EditProfile"));
const Profile = lazy(() => import("../components/pages/Profile"));
const Signin = lazy(() => import("../components/pages/Signin"));
const Volunteers = lazy(() => import("../components/pages/Volunteers"));

const Signup = lazy(() => import("../components/pages/Signup"));
const Navbar = lazy(() => import("../components/base/Navbar"));
const Home = lazy(() => import("../components/pages/Home"));
const VolunteerRequest = lazy(() =>
  import("../components/pages/VolunteerRequest")
);
const SingleEvent = lazy(() => import("../components/pages/SingleEvent"));
const Footer = lazy(() => import("../components/base/Footer"));
const VolunteerEvents = lazy(() =>
  import("../components/pages/VolunteerEvents")
);

export const DefaultRoutes = () => {
  let { pathname } = useLocation();
  return (
    <div className="app__container">
      {!(
        pathname == "/login" ||
        pathname == "/signup" ||
        pathname == "/signin"
      ) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<VolunteerRequest />} />
        <Route path="/events" element={<Events />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/event/:id" element={<SingleEvent />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <VolunteerEvents />
            </PrivateRoute>
          }
        />
        <Route path="/admin/login" element={<LogIn />} />
      </Routes>
      {!(
        pathname == "/login" ||
        pathname == "/signup" ||
        pathname == "/signin"
      ) && <Footer />}
    </div>
  );
};
