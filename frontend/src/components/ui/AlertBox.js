import { Alert, AlertTitle, Collapse } from "@mui/material";
import React from "react";

const AlertBox = ({ open, message, severity }) => {
  return (
    <Collapse in={open} sx={{ position: "fixed", top: "100px", right: "30px" }}>
      <Alert severity={severity}>
        <AlertTitle>{severity.toUpperCase()}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertBox;
