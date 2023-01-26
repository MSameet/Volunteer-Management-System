import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
export const VolunteerHomeCard = (volunteer) => {
  function renderRating(val) {
    let array = "";
    for (let i = 1; i <= val; i++) {
      console.log(val);
      array = [...array, <StarIcon />];
    }
    return array;
  }
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
        <Typography sx={{ textAlign: "center" }}>
          {" "}
          {renderRating(volunteer.rating)}
        </Typography>
      </CardContent>
    </Card>
  );
};
