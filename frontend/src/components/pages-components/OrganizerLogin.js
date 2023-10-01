import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";
import { login } from "../../redux/reducer/userReducer";
import AlertBox from "../ui/AlertBox";

export const OrganizerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
      `/organiser/organiser-login`,
      {
        email,
        password,
      },
      config
    )
      .then((res) => {
        dispatch(login(res.data));
        console.log(res.data);
        if (res?.data) {
          navigate("/dashboard");
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
      {" "}
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
    </>
  );
};
