import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import volunteers from "../../assets/i/user-male.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/reducer/userReducer";
import FileBase from "react-file-base64";
import { Axios } from "../../Axios";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userSignUp() {
    Axios.post("/user/register", {
      name,
      email,
      password,
      city,
      country,
      avatar,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(signup(res.data));
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        window.localStorage.setItem("token", res.data.token);
        if (res.data.token) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="register_container signup_container">
      <Grid container className="register__innercontainer">
        <Grid item xs={5} className="register_img-box">
          <h1 className="register_heading">Signup</h1>
          <img src={volunteers} alt="" className="register_img" />
        </Grid>
        <Grid item xs={7} className="register__box">
          <form className="inputs_form">
            <TextField
              label="Name"
              variant="outlined"
              className="input__fields"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              className="input__fields"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="City"
              variant="outlined"
              className="input__fields"
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              label="Country"
              variant="outlined"
              className="input__fields"
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="text"
              className="input__fields"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Role"
              >
                <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ marginBlock: "20px" }}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setAvatar(base64)}
              />
            </Box>

            <div className="form_btn_box">
              <Button
                variant="contained"
                className="form_btn"
                onClick={userSignUp}
              >
                SignUp
              </Button>
            </div>

            <p className="register__infotext">
              Already have an account. <Link to="/login">Login</Link>
            </p>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
