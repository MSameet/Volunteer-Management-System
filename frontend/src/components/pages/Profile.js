import { Container, Grid, TextField } from "@mui/material";
import React from "react";
import { Navbar } from "../base/Navbar";

export const Profile = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="app_container">
      <Navbar />
      <Container className="profile_container">
        <Grid container spacing={1.5}>
          <Grid item xs={12} className="text__center">
            <img
              src={user?.avatar || `/assets/i/profile.jpeg`}
              alt=""
              className="profile__img"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Name"
              value={user?.name.toUpperCase()}
              disabled
              focused
              fullWidth
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Email"
              value={user?.email.toUpperCase()}
              disabled
              focused
              fullWidth
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="City"
              value={user?.city.toUpperCase()}
              disabled
              focused
              fullWidth
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Country"
              value={user?.country.toUpperCase()}
              disabled
              focused
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
