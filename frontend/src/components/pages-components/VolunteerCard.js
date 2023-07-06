import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export const VolunteerCard = ({ volunteer }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={volunteer?.avatar}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {volunteer?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {volunteer?.email}
        </Typography>
      </CardContent>
    </Card>
  );
};
