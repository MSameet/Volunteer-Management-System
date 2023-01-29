import { Box, Container, Grid, Typography } from "@mui/material";
import { Axios } from "../../Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VolunteerCard } from "../pages-components/VolunteerCard";

export const Volunteers = () => {
  const [volunteers, setVolunteers] = useState();
  function fetchVolunteers() {
    Axios.get("/user/volunteers")
      .then((res) => {
        setVolunteers(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchVolunteers();
  }, []);
  return (
    <Container>
      <Box sx={{ paddingBlock: "40px" }}>
        <Typography variant="h3" xs={{ textAlign: "center" }}>
          Volunteers
        </Typography>
        <Grid container spacing={1.5}>
          {volunteers?.map((volunteer, i) => (
            <Grid item xs={12} sm={6} lg={3} key={volunteer._id}>
              <VolunteerCard {...volunteer} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
