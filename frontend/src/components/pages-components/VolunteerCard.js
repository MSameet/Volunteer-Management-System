import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import textTruncate from "../../utils/truncateText";

export const VolunteerCard = ({ volunteer }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        sx={{ my: 4 }}
        className="volunteer__card"
        image={
          volunteer?.avatar.includes("public")
            ? `http://localhost:8080/${volunteer?.avatar}`
            : volunteer?.avatar
        }
      />
      <CardContent className="text-center">
        <div className="d-flex align-items-center justify-content-between mx-5">
          <Typography gutterBottom variant="body1" component="div">
            Name
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            {volunteer?.name}
          </Typography>
        </div>
        <div className="d-flex align-items-center justify-content-between mx-5">
          <Typography gutterBottom variant="body1" component="div">
            Email
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            {textTruncate(volunteer?.email, 10)}
          </Typography>
        </div>
        <div className="d-flex align-items-center justify-content-between mx-5">
          <Typography gutterBottom variant="body1" component="div">
            Qualification
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            {volunteer?.qualification}
          </Typography>
        </div>
        <div className="d-flex align-items-center justify-content-between mx-5">
          <Typography gutterBottom variant="body1" component="div">
            Skill
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            {volunteer?.skill}
          </Typography>
        </div>
        <div className="mx-5">
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            className="text-start"
          >
            About
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            className="text-start"
          >
            {textTruncate(volunteer?.about, 30)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
