import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";
import Image from "../../assets/i/page-header-bg.jpg";
import { EventCard } from "../pages-components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  function fetchEvents() {
    Axios.get("/event/all-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "400px",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          position: "relative",
        }}
        className="image_box"
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            color: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Events
        </Typography>
      </Box>
      <Container>
        <Box sx={{ paddingBlock: "40px" }}>
          <Grid container spacing={2}>
            {events.length > 0 ? (
              events?.map((event, i) => (
                <Grid item xs={12} sm={6} lg={4} key={i}>
                  <Link to={{ pathname: `/event/${event?._id}` }} state={event}>
                    {" "}
                    <EventCard event={event} />
                  </Link>
                </Grid>
              ))
            ) : (
              <div className=" vh-100 d-flex align-item-center justify-content-center">
                Loading...
              </div>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Events;
