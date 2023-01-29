import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminDrawer } from "../components/pages-components/AdminDrawer";
import { AdminToolbar } from "../components/pages-components/AdminToolbar";
import { Admin } from "../components/pages/Admin";
import { CreateEvent } from "../components/pages/CreateEvent";
import { LogIn } from "../components/pages/LogIn";
import { NotFound } from "../components/pages/NotFound";
import { Volunteers } from "../components/pages/Volunteers";

export const AdminRoute = () => {
  const [state, setState] = useState({
    left: false,
  });
  const [events, setEvents] = useState();
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
    <>
      <AdminDrawer toggleDrawer={toggleDrawer} state={state} />
      <AdminToolbar toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/volunteers" element={<Volunteers />} />
      </Routes>
    </>
  );
};
