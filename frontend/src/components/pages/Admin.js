import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { EventCard } from "../pages-components/EventCard";

export const Admin = () => {
  const [events, setEvents] = useState();

  function fetchEvents() {
    axios
      .get("http://localhost:8080/event/all-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <Box>
        <Container>
          <Box sx={{ textAlign: "right" }}>
            <Button variant="outlined" href="/create-event">
              Create Event
            </Button>
          </Box>
          <Box sx={{ marginBlock: "40px" }}>
            <Grid container spacing={1.5}>
              {events?.map((event, i) => (
                <Grid item xs={12} sm={6} lg={3} key={i}>
                  <EventCard {...event} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
