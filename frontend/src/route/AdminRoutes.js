import { Box } from "@mui/material";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminToolbar } from "../components/pages-components/AdminToolbar";
import { Admin } from "../components/pages/Admin";
import { CreateEvent } from "../components/pages/CreateEvent";
import EditEvent from "../components/pages/EditEvent";
import SingleEvent from "../components/pages/SingleEvent";
import { Volunteers } from "../components/pages/Volunteers";
const EditProfile = lazy(() => import("../components/pages/EditProfile"));
const Profile = lazy(() => import("../components/pages/Profile"));

export const AdminRoutes = () => {
  return (
    <>
      <AdminToolbar />
      <Box mt={3}>
        <Routes>
          <Route path="/event" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/volunteers" element={<Volunteers />} />
        </Routes>
      </Box>
    </>
  );
};
