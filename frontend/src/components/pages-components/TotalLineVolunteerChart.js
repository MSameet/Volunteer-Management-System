// material-ui

import { Grid, Typography } from "@mui/material";

// third-party

import Chart from "react-apexcharts";

// project imports

import { gridSpacing } from "../../data/constant";
import MainCard from "./MainCard";

// chart data
import chartData from "../../data/total-volunteer-line-chart";

const TotalLineVolunteerChart = () => {
  return (
    <>
      <MainCard>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontSize: "24px",
                        fontWeight: 500,
                      }}
                    >
                      Volunteers
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Chart {...chartData} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default TotalLineVolunteerChart;
