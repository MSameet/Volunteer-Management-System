import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminToolbar } from "../components/pages-components/AdminToolbar";
import { Admin } from "../components/pages/Admin";
import { CreateEvent } from "../components/pages/CreateEvent";
import EditEvent from "../components/pages/EditEvent";
import { Profile } from "../components/pages/Profile";
import SingleEvent from "../components/pages/SingleEvent";
import { Volunteers } from "../components/pages/Volunteers";

export const AdminRoutes = () => {
  return (
    <>
      <AdminToolbar />
      <Box mt={3}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/volunteers" element={<Volunteers />} />
        </Routes>
      </Box>
    </>
  );
};
