import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export const EventCard = (event) => {
  return (
    <Card sx={{ minWidth: 275 }} className="event_card">
      <CardMedia
        sx={{ height: 240 }}
        image={event.banner}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
