import { Container, Grid } from "@mui/material";
import React from "react";
import { Navbar } from "../base/Navbar";

export const Profile = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="app_container">
      <Navbar />
      <Container className="profile_container">
        <Grid container>
          <Grid item xs={12}>
            <img src={user.avatar} alt="" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
