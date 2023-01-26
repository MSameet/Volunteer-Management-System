import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar } from "../base/Navbar";
import { VolunteerHomeCard } from "../pages-components/VolunteerHomeCard";

export const VolunteerHome = () => {
  const [volunteers, setVolunteers] = useState();
  function fetchVolunteers() {
    axios
      .get("http://localhost:2000/user/volunteers")
      .then((res) => {
        setVolunteers(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchVolunteers();
  }, []);
  return (
    <div className="app_container">
      <Navbar />{" "}
      <Container>
        <Box sx={{ paddingBlock: "40px" }}>
          <Typography variant="h3" xs={{ textAlign: "center" }}>
            Volunteers
          </Typography>
          <Grid container spacing={1.5}>
            {volunteers?.map((volunteer, i) => (
              <Grid item xs={12} sm={6} lg={3} key={volunteer._id}>
                <VolunteerHomeCard {...volunteer} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
