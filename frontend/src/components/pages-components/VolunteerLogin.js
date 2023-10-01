import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";
import { login } from "../../redux/reducer/userReducer";
import AlertBox from "../ui/AlertBox";
import { FaceLoginModal } from "./FaceLoginModal";

export const VolunteerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userLogin() {
    setIsLoading(true);
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
          navigate(-1);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsOpen(true);
        setIsLoading(false);
      });
  }

  return (
    <>
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
          {isLoading ? (
            <Button disabled variant="contained">
              <CircularProgress color="inherit" />
            </Button>
          ) : (
            <Button
              variant="contained"
              className="form_btn"
              onClick={userLogin}
            >
              Login
            </Button>
          )}
        </div>
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }}>
          OR
        </Divider>
        <Box sx={{ textAlign: "center" }}>
          {" "}
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen("face");
              setCameraStatus("open");
            }}
          >
            Face Recognition
          </Button>
        </Box>
        <p className="register__infotext">
          Don't have an account. <Link to="/signup">Signup</Link>
        </p>
      </form>
      <AlertBox
        open={isOpen}
        severity="error"
        setIsOpen={setIsOpen}
        message="Password or Email is incorrect."
      />
      <FaceLoginModal
        open={isOpen == "face"}
        handleClose={() => setIsOpen(false)}
        setCameraStatus={setCameraStatus}
        cameraStatus={cameraStatus}
      />
    </>
  );
};
