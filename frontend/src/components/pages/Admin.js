import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { EventCard } from "../pages-components/EventCard";

export const Admin = () => {
  const [state, setState] = React.useState({
    left: false,
  });
  const [events, setEvents] = useState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function fetchEvents() {
    axios
      .get("http://localhost:8080/event/all-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <Box
            sx={{ width: "250px" }}
            role="presentation"
            onClick={toggleDrawer("left", false)}
            onKeyDown={toggleDrawer("left", false)}
          >
            <List>
              <ListItem key={"text"} disablePadding>
                <ListItemButton>
                  <Link to="/Events" style={{ color: "#000" }}>
                    Events
                  </Link>
                </ListItemButton>
              </ListItem>
              <ListItem key={"text"} disablePadding>
                <ListItemButton>
                  <Link to="/volunteers" style={{ color: "black" }}>
                    Volunteers
                  </Link>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
      <Box>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
        </Toolbar>
        <Container>
          <Box sx={{ textAlign: "right" }}>
            <Button variant="outlined" href="/create-event">
              Create Event
            </Button>
          </Box>
          <Box sx={{ marginBlock: "40px" }}>
            <Grid container spacing={1.5}>
              {events?.map((event, i) => (
                <Grid item xs={12} sm={6} lg={3} key={i}>
                  <EventCard {...event} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
