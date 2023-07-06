import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import React from "react";

// custom tooltip
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const EventCard = ({ event }) => {
  // const { user, token } = useSelector((state) => state?.userReducer);

  // function addVolunteerIntoEvent() {
  //   Axios.post(
  //     "/event/add-volunteer",
  //     {
  //       _id: event?._id,
  //       volunteer: user?._id,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }
  return (
    <>
      <Card sx={{ minWidth: 275 }} className="event_card">
        <CardMedia
          sx={{ height: 240 }}
          image={event?.banner}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event?.title}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {dayjs(event?.createdAt).format("MMM DD YYYY")}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="event-Card_des"
          >
            {event?.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
