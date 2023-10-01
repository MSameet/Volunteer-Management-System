import styled from "@emotion/styled";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";
import AlertBox from "../ui/AlertBox";

// styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  boxShadow: "0 0 20px 0 rgba(188,209,218,.31)",
  border: "1px solid rgba(126,151,172,.15)",
  marginBlock: "18px",
}));
const SingleEvent = () => {
  const { state } = useLocation();
  const { user, token } = useSelector((state) => state?.userReducer);
  const [request, setRequest] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  console.log(event, "request");

  const giveReward = (id) => {
    Axios.patch(`/user/give-reward?_id=${id}`, {
      rating: value,
      comment,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // accept volunteer request
  function acceptRequest(id) {
    setIsMounted(false);
    Axios.post(`/request/accept-volunteer-request?_id=${id}`)
      .then((res) => {
        console.log(res.data);
        setIsMounted(true);
      })
      .catch((err) => console.log(err));
  }

  // accept volunteer request
  function rejectRequest(id) {
    setIsMounted(false);
    Axios.post(`/request/reject-volunteer-request?_id=${id}`)
      .then((res) => {
        console.log(res.data);
        setIsMounted(true);
      })
      .catch((err) => console.log(err));
  }

  // apply for request
  function applyRequest() {
    if (!token) {
      navigate("/signin");
    }
    setOpen(false);
    Axios.post("request/create-user-request", {
      sender: user?._id,
      event: state?._id,
    })
      .then((res) => {
        console.log(res.data, "apply");
        setOpen(true);
        let interval = setTimeout(() => setOpen(false), 2000);
        navigate(-1);
        return () => {
          clearTimeout(interval);
        };
      })
      .catch((err) => console.log(err));
  }

  // get REquest
  function getRequest() {
    Axios.get(`/request/get-request?_id=${state?._id}`)
      .then((res) => {
        console.log(res.data, "this");
        setRequest(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (state?.status == "completed") {
      Axios.get(`/event/single-event?_id=${state?._id}`)
        .then((res) => {
          console.log(res.data, "117");
          setEvent(res.data);
          setValue(res.data?.volunteers?.rating);
          setComment(res.data?.volunteers?.comment);
        })
        .catch((err) => console.log(err));
    }
  }, [state]);
  console.log(state);
  useEffect(() => {
    getRequest();
  }, [isMounted]);
  return (
    <>
      {" "}
      <Container>
        <Item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={state?.banner}
                  sx={{ width: 82, height: 82 }}
                />
                <Box>
                  <Typography variant="h5">{state?.title}</Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                    mt={1}
                  >
                    <Chip label={state?.type} color="primary" />
                    <Typography
                      variant="overline"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <LocationOnIcon fontSize="small" color="primary" />{" "}
                      {state?.city}
                    </Typography>
                    <Typography
                      variant="overline"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <AccessTimeIcon fontSize="small" color="primary" />{" "}
                      {state?.duration}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {!(user?.role == "organizer" || user?.role == "admin") && (
              <Button
                variant="contained"
                disabled={request?.some(
                  (req) =>
                    req.event == state?._id && req.sender?._id == user?._id
                )}
                onClick={applyRequest}
              >
                Apply
              </Button>
            )}
          </Box>
        </Item>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">General</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">
                Description of assignment title
              </Typography>
              <Typography variant="caption">{state?.description}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Host Entity</Typography>
              <Typography variant="caption">
                {state?.organizer?.name || "UNV"}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Country</Typography>
              <Typography variant="caption">{state?.country}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Type</Typography>
              <Typography variant="caption">{state?.type}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Expected Start Date</Typography>
              <Typography variant="caption">{state?.startDate}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Expected End Date</Typography>
              <Typography variant="caption">{state?.endDate}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Duration</Typography>
              <Typography variant="caption">{state?.duration}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">No Of Assigment(s)</Typography>
              <Typography variant="caption">
                {state?.noOfAssignments}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="subtitle2">Duty Station</Typography>
              <Typography variant="caption">{state?.city}</Typography>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Detail</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">{state?.detail}</Typography>
            </Grid>
          </Grid>
        </Item>
        {user?.role == "organizer" &&
          request.length > 0 &&
          !(state?.status == "completed") && (
            <Item>
              <Typography variant="h4" mb={3}>
                Volunteers's Requests
              </Typography>
              <TableContainer component={Paper} className="history__table">
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Skills</TableCell>
                      <TableCell>Request's Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {request.map((data, i) => {
                      return (
                        <>
                          <TableRow key={data?._id}>
                            <TableCell>{data?.sender?.name}</TableCell>
                            <TableCell>{data?.sender?.email}</TableCell>
                            <TableCell>{data?.sender?.skill}</TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                color={
                                  data?.status == "accept"
                                    ? "green "
                                    : data?.status == "pending"
                                    ? "gray"
                                    : "red"
                                }
                              >
                                {data?.status}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                color="error"
                                onClick={() => rejectRequest(data?._id)}
                              >
                                <CloseIcon />
                              </IconButton>
                              <IconButton
                                color="success"
                                disabled={data?.status == "accept"}
                                onClick={() => acceptRequest(data?._id)}
                              >
                                <DoneIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          )}
        {state?.status == "completed" &&
          state?.volunteers.length > 0 &&
          user?.role == "organizer" && (
            <Item>
              <Typography variant="h4" mb={3}>
                Volunteer(s)
              </Typography>
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={event?.volunteers?.avatar}
                        sx={{ width: 82, height: 82 }}
                      />
                      <Box>
                        <Typography variant="h5">
                          {event?.volunteers?.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                          mt={1}
                        >
                          <Typography
                            variant="overline"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            {event?.volunteers?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box my={2}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  label="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => giveReward(event?.volunteers?._id)}
                >
                  Post
                </Button>
              </>
            </Item>
          )}
      </Container>
      <AlertBox
        open={open}
        severity="success"
        message="You have been applied successfully"
      />
    </>
  );
};

export default SingleEvent;
