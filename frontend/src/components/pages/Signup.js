import styled from "@emotion/styled";
import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { OrganizerSignup } from "./OrganizerSignup";
import { VolunteerSignup } from "./VolunteerSignup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  boxShadow: "0 0 20px 0 rgba(188,209,218,.31)",
  border: "1px solid rgba(126,151,172,.15)",
  marginBlock: "18px",
}));
const Signup = () => {
  const [selectedValue, setSelectedValue] = React.useState("volunteer");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Container>
      <Box py={5} className="signup__box">
        <Item>
          <form className="plans" onChange={handleChange}>
            <Typography variant="h4" className="title">
              Get Started
            </Typography>
            <label className="plan basic-plan" for="basic">
              <input
                type="radio"
                name="user"
                id="basic"
                value="volunteer"
                checked={selectedValue == "volunteer"}
                className="p-element"
              />
              <div className="plan-content">
                <img loading="lazy" src="/assets/i/user_2_fill.svg" alt="" />
                <div className="plan-details">
                  <span>Volunteer</span>
                  <p>Volunteers: Catalysts for progress.</p>
                </div>
              </div>
            </label>

            <label className="plan complete-plan" for="complete">
              <input
                type="radio"
                name="user"
                id="complete"
                value="organizer"
                checked={selectedValue == "organizer"}
              />
              <div className="plan-content">
                <img
                  loading="lazy"
                  src="/assets/i/building_3_fill.svg"
                  alt=""
                />
                <div className="plan-details">
                  <span>Organization</span>
                  <p>Join hands, transform lives.</p>
                </div>
              </div>
            </label>
          </form>
        </Item>
        <Item>
          {selectedValue == "volunteer" ? (
            <VolunteerSignup role={selectedValue} />
          ) : (
            selectedValue == "organizer" && (
              <OrganizerSignup role={selectedValue} />
            )
          )}
        </Item>
      </Box>
    </Container>
  );
};

export default Signup;
