import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import { Navbar } from "../base/Navbar";
import { EventCard } from "../pages-components/EventCard";

export const Events = () => {
  const [events, setEvents] = useState();
  function fetchEvents() {
    Axios.get("/event/all-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="app_container">
      <Navbar />
      <Container maxWidth="xl">
        <Box sx={{ paddingBlock: "40px" }}>
          <Typography variant="h3">Events</Typography>
          <Grid container spacing={2}>
            {events?.map((event, i) => (
              <Grid item xs={12} sm={6} lg={3} key={i}>
                <EventCard {...event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
