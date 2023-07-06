import StarIcon from "@mui/icons-material/Star";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
export const VolunteerHomeCard = ({ volunteer }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="340"
        xs={{ objectFit: "cover" }}
        image={volunteer?.avatar}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {volunteer?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {volunteer?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {volunteer?.city}, {volunteer?.country}
        </Typography>
        <Typography>
          {[...new Array(volunteer?.rating)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};
