import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import volunteers from "../../assets/i/user-male.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducer/userReducer";

export const LogIn = () => {
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

    axios
      .post(
        `http://localhost:8080/user/login`,
        {
          email,
          password,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        dispatch(login(res.data));
        window.localStorage.setItem("user", JSON.stringify(res?.data?.user));
        window.localStorage.setItem("token", res?.data?.token);
        if (res.data.token) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
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
  );
};
