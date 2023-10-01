import { Container, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import ActiveCard from "../pages-components/ActiveCard";
import ActiveEventCard from "../pages-components/ActiveEventCard";
import EarningCard from "../pages-components/EarningCard";
import TotalGrowthBarChart from "../pages-components/TotalGrowthBarChart";
import TotalLineVolunteerChart from "../pages-components/TotalLineVolunteerChart";
import TotalOrderLineChartCard from "../pages-components/TotalOrderLineChartCard";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,

  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Dashboard = () => {
  const [eventsCount, setEventsCount] = useState(12);
  const [volunteerCount, setVolunteerCount] = useState(10);
  const [activeEventsCount, setActiveEventsCount] = useState(10);

  // useEffect(() => {
  //   Axios.get(`/event/get-alldata`)
  //     .then((res) => {
  //       setEventsCount(res?.data?.events);
  //       setVolunteerCount(res?.data?.volunteer);
  //       setActiveEventsCount(res?.data?.activeEvents);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div className="mb-4">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12} sm={12}>
            <Item>
              <EarningCard eventsCount={eventsCount} />
            </Item>
          </Grid>
          <Grid item lg={4} md={6} xs={12} sm={12}>
            <Item>
              <TotalOrderLineChartCard volunteerCount={volunteerCount} />
            </Item>
          </Grid>
          <Grid item lg={4} md={12} xs={12} sm={12}>
            <Item>
              <ActiveEventCard activeEventsCount={activeEventsCount} />
            </Item>
          </Grid>
          <Grid item xs={12} lg={8} sm={12} md={12}>
            <Item>
              <TotalGrowthBarChart />
            </Item>
          </Grid>
          <Grid item xs={12} lg={4} sm={12} md={12}>
            <Item>
              <ActiveCard />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <TotalLineVolunteerChart />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
