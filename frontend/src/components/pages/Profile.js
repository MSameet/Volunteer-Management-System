import styled from "@emotion/styled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

// styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  boxShadow: "0 0 20px 0 rgba(188,209,218,.31)",
  border: "1px solid rgba(126,151,172,.15)",
  marginBlock: "18px",
}));

export const Profile = () => {
  const { user } = useSelector((state) => state?.userReducer);
  return (
    <>
      <Container>
        <Item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Avatar
                alt="Remy Sharp"
                src={user?.avatar}
                sx={{ width: 82, height: 82, objectFit: "cover" }}
              />
              <Box>
                <Typography variant="h5">{user?.name}</Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  mt={1}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <LocationOnIcon fontSize="small" color="primary" />{" "}
                    {user?.city}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button variant="contained">Edit</Button>
          </Box>
        </Item>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Information</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Name</Typography>
              <Typography variant="caption">{user?.name}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Username</Typography>
              <Typography variant="caption">{user?.username}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Email</Typography>
              <Typography variant="caption">{user?.email}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Phone Number</Typography>
              <Typography variant="caption">{user?.phoneNumber}</Typography>
            </Grid>
            {user?.role == "volunteer" ? (
              <Grid item md={6} xs={12}>
                <Typography variant="subtitle2">Skill(s)</Typography>
                <Typography variant="caption">{user?.skill}</Typography>
              </Grid>
            ) : (
              <Grid item md={6} xs={12}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography variant="caption">{user?.type}</Typography>
              </Grid>
            )}
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">City</Typography>
              <Typography variant="caption">{user?.city}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Country</Typography>
              <Typography variant="caption">{user?.country}</Typography>
            </Grid>
            {user?.role == "volunteer" && (
              <>
                <Grid item md={6} xs={12}>
                  <Typography variant="subtitle2">Age</Typography>
                  <Typography variant="caption">{user?.age}</Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="subtitle2">Date of Birth</Typography>
                  <Typography variant="caption">{user?.dob}</Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="subtitle2">Qualification</Typography>
                  <Typography variant="caption">
                    {user?.qualification}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="subtitle2">Rating</Typography>
                  <Typography variant="caption">{user?.rating}</Typography>
                </Grid>
              </>
            )}

            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Role</Typography>
              <Typography variant="caption">{user?.role}</Typography>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">About</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">{user?.about}</Typography>
            </Grid>
          </Grid>
        </Item>
      </Container>
    </>
  );
};
