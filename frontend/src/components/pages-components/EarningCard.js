import { useState } from "react";

// material-ui
import { Box, Card, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import EventIcon from "../../assets/i/calendar_time_add_line.svg";

// assets

const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
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
    background: theme.palette.secondary.main,
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
    background: theme.palette.secondary.main,
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, eventsCount }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardWrapper>
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
              <img src={EventIcon} alt="school" />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "34px",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                {eventsCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                Total Events
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardWrapper>
    </>
  );
};

export default EarningCard;
