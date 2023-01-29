import {
  Box,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const AdminDrawer = ({ state, toggleDrawer }) => {
  return (
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
                <Link to="/admin" style={{ color: "#000" }}>
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
  );
};
