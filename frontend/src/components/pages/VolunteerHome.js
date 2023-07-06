import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import Image from "../../assets/i/page-header-bg.jpg";
import { VolunteerHomeCard } from "../pages-components/VolunteerHomeCard";

export const VolunteerHome = () => {
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
    <div>
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
          Volunteers
        </Typography>
      </Box>
      <Container>
        <Box sx={{ paddingBlock: "40px" }}>
          <Grid container spacing={1.5}>
            {volunteers?.map((volunteer, i) => (
              <Grid item xs={12} sm={6} lg={4} key={volunteer._id}>
                <VolunteerHomeCard volunteer={volunteer} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
