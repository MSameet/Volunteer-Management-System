import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
const CardWrapper = styled(Card)(({ theme }) => ({
  color: "black",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const Organization = ({ organizer }) => {
  return (
    <>
      <CardWrapper>
        <Box
          sx={{
            py: 7.25,
            px: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgb(243, 240, 240)",
              marginBlock: "10px",

              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <img
              style={{
                overflow: "hidden",
                objectFit: "cover",
                borderRadius: "50%",
                height: "100px",
                width: "100px",
              }}
              src={organizer?.avatar}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            {organizer?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            {organizer?.type}
          </Typography>
          <Box
            sx={{
              marginBlock: "15px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              About
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              {organizer?.about}
            </Typography>
          </Box>
        </Box>
      </CardWrapper>
    </>
  );
};

export default Organization;
