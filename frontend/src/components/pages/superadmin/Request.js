import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

// new
import { styled } from "@mui/material/styles";
import { Axios } from "../../../Axios";

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

const Request = () => {
  const [request, setRequest] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const { token } = useSelector((state) => state?.userReducer);

  function fetchRequests() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    Axios.get(`/request/get-all-request`, config)
      .then((res) => {
        setRequest(res.data);
        console.log(res.data, "request");
      })
      .catch((err) => console.log(err));
  }

  //   accept request
  function acceptRequest(id) {
    Axios.post(`/request/accept-user-create-request?_id=${id}`)
      .then((res) => {
        console.log(res.data);
        setIsMounted(true);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchRequests();
  }, [isMounted]);
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
    <Box>
      <Container>
        <Box>
          <Typography variant="h4">Request</Typography>
        </Box>
        <Box sx={{ marginBlock: "20px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {request?.length == 0 ? (
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
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {request?.map((data, i) => {
                            return (
                              <>
                                <TableRow key={data?._id}>
                                  <TableCell>{data?.data?.name}</TableCell>
                                  <TableCell>{data?.data?.username}</TableCell>
                                  <TableCell>{data?.data?.email}</TableCell>
                                  <TableCell>{data?.type}</TableCell>
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
                                    <IconButton color="error">
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
  );
};

export default Request;
