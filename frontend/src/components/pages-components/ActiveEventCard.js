// material-ui
import { Box, Card, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ActiveIcon from "../../assets/i/schedule_line.svg";

// project imports

// assets

const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
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
    background: theme.palette.success.main,
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
    background: theme.palette.success.main,
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

const ActiveEventCard = ({ activeEventsCount }) => {
  const theme = useTheme();
  return (
    <div>
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
              <img src={ActiveIcon} alt="school" />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "34px",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                {activeEventsCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                Active Events
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardWrapper>
    </div>
  );
};

export default ActiveEventCard;
