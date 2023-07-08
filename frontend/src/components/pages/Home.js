import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";
import ThreeIconBox2 from "../../assets/i/three_iocn_box_bg-2.png";
import ThreeIconBox3 from "../../assets/i/three_iocn_box_bg-3.png";
import ThreeIconBox from "../../assets/i/three_iocn_box_bg.png";
import Banner from "../pages-components/Banner";
import { EventCard } from "../pages-components/EventCard";
import HomeQuotes from "../pages-components/HomeQuotes";

const Home = () => {
  const [events, setEvents] = useState([]);
  console.log(events);
  function fetchEvents() {
    Axios.get("/event/all-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <main>
        <Banner />
        <Container>
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 10px 60px 0px rgb(0, 0, 0, .08)",
              padding: "49px 60px 49px",
              margin: "-60px",
              borderRadius: "8px",
              zIndex: "1030",
              position: "relative",
              "@media (max-width:992px)": {
                padding: "49px 30px 29px",
                maxWidth: "760px",
                marginInline: "auto",
              },
              "@media (max-width:768px)": {
                padding: "49px 30px 29px",
                maxWidth: "460px",
                marginInline: "auto",
              },
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontFamily: "Ubuntu, sans-serif",
                "@media (max-width:768px)": {
                  // fontSize: "22px",
                },
              }}
              mb={5}
            >
              Helping each other can make world better
            </Typography>
            <Grid
              container
              spacing={3}
              mt={3}
              sx={{
                "@media (max-width:992px)": {
                  justifyContent: "center",
                  gap: "30px",
                  paddingInline: "40px",
                },
                "@media (max-width:768px)": {
                  justifyContent: "center",
                  gap: "20px",
                  paddingInline: "20px",
                },
              }}
            >
              <Grid item lg={4} xs={12}>
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                      marginBottom: "50px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={ThreeIconBox}
                        alt="ThreeIconBox"
                        className="info_img"
                      />
                      <div className="icon_heartBox">
                        <span className="icon-heart"></span>
                      </div>
                    </Box>
                    <Typography variant="h5">Become Volunteer</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#88858e" }}>
                    Becoming a volunteer is a wonderful way to contribute to
                    society, make a positive impact, and grow personally.
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                      marginBottom: "50px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={ThreeIconBox2}
                        alt="ThreeIconBox"
                        className="info_img"
                      />
                      <div className="icon_heartBox">
                        <span className="icon-wallet-filled-money-tool"></span>
                      </div>
                    </Box>
                    <Typography variant="h5">Quick Fundraise</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#88858e" }}>
                    Quick Fundraise harnesses the power of technology to
                    accelerate the fundraising process.
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                      marginBottom: "50px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={ThreeIconBox3}
                        alt="ThreeIconBox"
                        className="info_img"
                      />
                      <div className="icon_heartBox">
                        <span className="icon-charity"></span>
                      </div>
                    </Box>
                    <Typography variant="h5">Start Donating</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#88858e" }}>
                    Donations play a crucial role in assisting individuals and
                    communities facing adversity.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
          <Box sx={{ paddingBlock: "50px", marginTop: "60px" }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontFamily: "Ubuntu, sans-serif",
                "@media (max-width:768px)": {
                  // fontSize: "22px",
                },
              }}
              mb={5}
            >
              Recent Events
            </Typography>
            <Grid container spacing={2}>
              {events.length > 0 &&
                events?.map((event, i) => {
                  if (i < 6)
                    return (
                      <Grid item xs={12} sm={6} lg={4} key={i}>
                        <Link
                          to={{ pathname: `/event/${event?._id}` }}
                          state={event}
                        >
                          {" "}
                          <EventCard event={event} />
                        </Link>
                      </Grid>
                    );
                })}
            </Grid>
          </Box>
        </Container>
        <section className="pt-2 mt-2 mb-5">
          <HomeQuotes />
        </section>
      </main>
    </>
  );
};
export default Home;
