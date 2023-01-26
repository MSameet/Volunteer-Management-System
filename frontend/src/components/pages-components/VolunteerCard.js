import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

export const VolunteerCard = (volunteer) => {
  const [rating, setRating] = useState();
  function updateRating(id) {
    axios
      .patch(`http://localhost:2000/user/volunteer-rating/${id}`, {
        rating,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  const role = window.localStorage.getItem("admin");
  return (
    <Card>
      <CardContent>
        <Box sx={{ textAlign: "center", marginBottom: "10px" }}>
          <CardMedia
            sx={{ height: 140 }}
            image={volunteer.avatar}
            title="green iguana"
          />
        </Box>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {volunteer.name},{volunteer.country}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>{volunteer.email}</Typography>
        {role == "admin" && (
          <>
            <TextField
              label="Rating"
              variant="standard"
              type="number"
              fullWidth
              onChange={(e) => setRating(e.target.value)}
            />
            <Button
              variant="outlined"
              sx={{ marginTop: "20px" }}
              onClick={() => updateRating(volunteer._id)}
            >
              Update
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
