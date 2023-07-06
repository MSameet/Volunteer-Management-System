import { Box, Container, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
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
export const Signup = () => {
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
            <label class="plan basic-plan" for="basic">
              <input
                type="radio"
                name="user"
                id="basic"
                value="volunteer"
                checked={selectedValue == "volunteer"}
                className="p-element"
              />
              <div class="plan-content">
                <img loading="lazy" src="/assets/i/user_2_fill.svg" alt="" />
                <div class="plan-details">
                  <span>Volunteer</span>
                  <p>
                    For smaller business, with simple salaries and pay
                    schedules.
                  </p>
                </div>
              </div>
            </label>

            <label class="plan complete-plan" for="complete">
              <input
                type="radio"
                name="user"
                id="complete"
                value="organizer"
                checked={selectedValue == "organizer"}
              />
              <div class="plan-content">
                <img
                  loading="lazy"
                  src="/assets/i/building_3_fill.svg"
                  alt=""
                />
                <div class="plan-details">
                  <span>Organization</span>
                  <p>
                    For growing business who wants to create a rewarding place
                    to work.
                  </p>
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
