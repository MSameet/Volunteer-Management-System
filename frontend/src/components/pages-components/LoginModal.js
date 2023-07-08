import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Grid, IconButton, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";
import volunteers from "../../assets/i/user-male.png";
import { login } from "../../redux/reducer/userReducer";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export const LoginModal = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userLogin() {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    Axios.post(
      `/user/login`,
      {
        email,
        password,
      },
      config
    )
      .then((res) => {
        dispatch(login(res.data));
        if (res?.data?.user?.role == "volunteer") {
          navigate("/");
        }
        if (res?.data?.user?.role == "organizer") {
          navigate("/event");
        }
        if (res?.data?.user?.role == "admin") {
          navigate("/admin");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal
      open={open}
      keepMounted
      onClose={() => setOpen("")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {" "}
      <Box sx={style}>
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            top: "2px",
          }}
        >
          <IconButton onClick={() => setOpen("")}>
            <ClearIcon />
          </IconButton>
        </Box>{" "}
        <div className="register_container">
          <Grid container className="register__innercontainer">
            <Grid item xs={12} className="register__box">
              <h1 className="register_heading">Login</h1>
              <img src={volunteers} alt="" className="register_img" />
              <form className="inputs_form">
                <TextField
                  label="Email"
                  variant="outlined"
                  className="input__fields"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="text"
                  className="input__fields"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="form_btn_box">
                  <Button
                    variant="contained"
                    className="form_btn"
                    onClick={userLogin}
                  >
                    Login
                  </Button>
                </div>
                <p className="register__infotext">
                  Don't have an account. <Link to="/signup">Signup</Link>
                </p>
              </form>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Modal>
  );
};
