import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";

export const AdminToolbar = () => {
  const { name } = useSelector((state) => state?.userReducer?.user);
  return (
    <AppBar AppBar position="static" className="header">
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ textTransform: "capitalize", color: "black" }}
          >
            {name}
          </Typography>
          <AccountMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
