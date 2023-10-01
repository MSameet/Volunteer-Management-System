import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";
import Image from "../../assets/i/page-header-bg.jpg";
import { EventCard } from "../pages-components/EventCard";
import { Loader } from "../ui/Loader";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  function fetchEvents() {
    setIsLoading(true);
    Axios.get(`/event/all-events?pageSize=${pageSize}`)
      .then((res) => {
        setEvents(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, [pageSize]);
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
            {isLoading ? (
              <div className=" h-100 d-flex align-items-center justify-content-center w-100 my-5 py-5">
                <Loader />
              </div>
            ) : events.length > 0 ? (
              events?.map((event, i) => (
                <Grid item xs={12} sm={6} lg={4} key={i}>
                  <Link to={{ pathname: `/event/${event?._id}` }} state={event}>
                    {" "}
                    <EventCard event={event} />
                  </Link>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                No Event Added
              </Typography>
            )}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={() => setPageSize((prev) => prev + 5)}
            >
              Load More
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Events;
