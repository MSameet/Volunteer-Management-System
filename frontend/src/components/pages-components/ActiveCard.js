import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { ActiveVolunteer } from "../../data/activevolunteer";
const CardWrapper = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,

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

const ActiveCard = () => {
  return (
    <>
      <CardWrapper>
        <Box sx={{ p: 1.25 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              color: "rgb(18, 25, 38)",
            }}
          >
            Active Volunteer
          </Typography>
          {ActiveVolunteer?.map((data, i) => (
            <Box
              sx={{
                borderBottom: "1px solid rgb(227, 232, 239)",
                marginTop: "20px",
              }}
              className={ActiveVolunteer?.length == i + 1 && "border-0"}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "rgb(18, 25, 38)",

                  marginBlock: "10px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {data?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Active
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      background: "green",
                      height: "7px",
                      width: "7px",
                      borderRadius: "50%",
                    }}
                  ></Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardWrapper>
    </>
  );
};

export default ActiveCard;
