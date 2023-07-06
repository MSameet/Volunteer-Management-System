import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";

// new
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { styled } from "@mui/material/styles";
import truncateText from "../../utils/truncateText";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.black,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
let fullWidthStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "100%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export const Admin = () => {
  const [events, setEvents] = useState([]);

  const { token } = useSelector((state) => state?.userReducer);

  function fetchEvents() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    Axios.get(`/event/events`, config)
      .then((res) => {
        setEvents(res.data);
        console.log(res.data, "events");
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchEvents();
  }, []);
  // new chagnes

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Box>
        <Container>
          <Box sx={{ textAlign: "right" }}>
            <Button variant="outlined" href="/create-event">
              Create Event
            </Button>
          </Box>
          <Box sx={{ marginBlock: "40px" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {events?.length == 0 ? (
                  <Grid item xs={12}>
                    <div className=" h-100 d-flex align-item-center justify-content-center">
                      Loading...
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Box>
                      <TableContainer
                        component={Paper}
                        className="history__table"
                      >
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Type</TableCell>
                              <TableCell>Duration</TableCell>
                              <TableCell>Actions</TableCell>
                              <TableCell>Preview</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {events?.map((data, i) => {
                              return (
                                <>
                                  <TableRow key={data?._id}>
                                    <TableCell>{data?.title}</TableCell>
                                    <TableCell>
                                      {truncateText(data?.description, 35)}
                                    </TableCell>
                                    <TableCell>{data?.type}</TableCell>
                                    <TableCell>{data?.duration}</TableCell>
                                    <TableCell>
                                      <Link
                                        to={{
                                          pathname: `/edit-event/${data?._id}`,
                                        }}
                                        state={data}
                                      >
                                        <IconButton>
                                          <EditIcon />
                                        </IconButton>
                                      </Link>
                                    </TableCell>
                                    <TableCell>
                                      <Link
                                        to={{ pathname: `/event/${data?._id}` }}
                                        state={data}
                                      >
                                        {" "}
                                        <IconButton>
                                          <VisibilityOutlinedIcon />
                                        </IconButton>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
