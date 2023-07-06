import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducer/userReducer";

export const AdminDrawer = ({ state, toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.userReducer);
  return (
    <React.Fragment key={"left"}>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <Box
          sx={{
            width: "250px",
            paddingInline: "20px",
            paddingBlock: "30px",
            textAlign: "center",
          }}
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <img
            src={user.avatar || "/assets/i/profile.jpeg"}
            alt=""
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              margin: "auto",
            }}
          />
          <h2 style={{ marginBlock: "20px" }}>{user?.name?.toUpperCase()}</h2>
          <List>
            <ListItem
              key={"text"}
              sx={{ paddingInline: "0px", borderBottom: "1px solid #e6e6e6" }}
            >
              <ListItemButton></ListItemButton>
            </ListItem>
            <ListItem
              key={"text"}
              sx={{ paddingInline: "0px", borderBottom: "1px solid #e6e6e6" }}
            >
              <ListItemButton>
                <Link
                  to="/volunteers"
                  style={{ color: "black" }}
                  className="flex items-center gap-2"
                >
                  <PersonIcon />{" "}
                  <Typography variant="subtitile1">Volunteers</Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              dispatch(logout());
              navigate("/");
              window.location.href("/");
            }}
          >
            Logout
          </Button>
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
