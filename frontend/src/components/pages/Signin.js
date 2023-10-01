import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { OrganizerLogin } from "../pages-components/OrganizerLogin";
import { VolunteerLogin } from "../pages-components/VolunteerLogin";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
const Signin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="register_container">
      <Grid container className="register__innercontainer">
        <Grid item xs={12} className="register__box">
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Volunteer" />
              <Tab label="Organizer" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <VolunteerLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OrganizerLogin />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
