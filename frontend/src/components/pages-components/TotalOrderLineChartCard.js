import { useState } from "react";

// material-ui
import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import VolunteerIcon from "../../assets/i/user_pin_line.svg";
import MainCard from "./MainCard";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary.main,
    borderRadius: "50%",
    zIndex: 1,
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
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary.main,
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

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ volunteerCount }) => {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 6.25 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Box
              sx={{
                background: "white",
                padding: " 10px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <img src={VolunteerIcon} alt="school" />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "34px",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                {volunteerCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                Total Volunteer
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalOrderLineChartCard;
