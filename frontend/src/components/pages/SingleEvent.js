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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Axios } from "../../Axios";

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
  const { user } = useSelector((state) => state?.userReducer);
  const [request, setRequest] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

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
    Axios.post("request/create-user-request", {
      type: "event",
      data: {
        name: user?.name,
        email: user?.email,
        skill: user?.skill,
        volunteerID: user?._id,
        event: state?._id,
      },
    })
      .then((res) => console.log(res.data, "apply"))
      .catch((err) => console.log(err));
  }

  // get REquest
  function getRequest() {
    Axios.get(`request/get-request?_id=${state?._id}`)
      .then((res) => {
        console.log(res.data, "this");
        setRequest(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getRequest();
  }, [isMounted]);
  return (
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
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <LocationOnIcon fontSize="small" color="primary" />{" "}
                    {state?.city}
                  </Typography>
                  <Typography
                    variant="overline"
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <AccessTimeIcon fontSize="small" color="primary" />{" "}
                    {state?.duration}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {!(user?.role == "organizer" || user?.role == "admin") && (
            <Button variant="contained" onClick={applyRequest}>
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
            <Typography variant="caption">{state?.organizer?.name}</Typography>
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
            <Typography variant="caption">{state?.noOfAssigments}</Typography>
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
      {user?.role == "organizer" && request.length > 0 && (
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
                        <TableCell>{data?.data?.name}</TableCell>
                        <TableCell>{data?.data?.email}</TableCell>
                        <TableCell>{data?.data?.skill}</TableCell>
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
    </Container>
  );
};

export default SingleEvent;
