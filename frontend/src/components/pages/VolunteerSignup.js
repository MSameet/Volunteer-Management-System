import {
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useFormik } from "formik";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Axios } from "../../Axios";
import { signup } from "../../redux/reducer/userReducer";
import AlertBox from "../ui/AlertBox";

export const VolunteerSignup = ({ role }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    dob: Yup.string().required("Date of Birth is required"),
    age: Yup.string().required("Age is required"),
    qualification: Yup.string().required("Qualification is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Full Address is required"),
    skill: Yup.string().required("Skill is required"),
    avatar: Yup.string().required("Avatar is required"),
    about: Yup.string().required("About is required"),
  });

  const handleSubmit = (values) => {
    console.log(values, "value");
    Axios.post(`/user/register`, {
      ...values,
      role,
    })
      .then((res) => {
        dispatch(signup(res?.data));
        formik.resetForm();
        setOpen(true);

        let interval = setTimeout(() => {
          setOpen(false);
          navigate("/");
        }, 3000);
        return () => {
          clearTimeout(interval);
        };
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      dob: "",
      age: "",
      country: "",
      city: "",
      address: "",
      qualification: "",
      avatar: "",
      password: "",
      skill: "",
      phoneNumber: "",
      about: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Avatar</InputLabel>
              <div className="uploader__box">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    formik.setFieldValue("avatar", base64)
                  }
                />
                <img
                  src={
                    formik.values?.avatar
                      ? formik.values?.avatar
                      : "/assets/i/upload_3_fill.svg"
                  }
                  alt=""
                  className={`img-fluid ${
                    formik.values?.avatar && "avatar__img"
                  }`}
                />
              </div>
              {formik.touched.avatar && formik.errors.avatar && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-urdu.avatar-login"
                >
                  {formik.errors.avatar}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              {...formik.getFieldProps("name")}
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.name}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              {...formik.getFieldProps("username")}
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
            />
            {formik.touched.username && formik.errors.username && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.username}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              {...formik.getFieldProps("password")}
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
            />
            {formik.touched.password && formik.errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.password}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.email}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              {...formik.getFieldProps("phoneNumber")}
              error={Boolean(
                formik.touched.phoneNumber && formik.errors.phoneNumber
              )}
              fullWidth
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.phoneNumber}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Age"
              variant="outlined"
              {...formik.getFieldProps("age")}
              error={Boolean(formik.touched.age && formik.errors.age)}
              fullWidth
            />
            {formik.touched.age && formik.errors.age && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.age}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <DemoItem>
              <DatePicker
                label="Date of Birth"
                onChange={(value) => formik.setFieldValue("dob", value, true)}
                error={Boolean(formik.touched.dob && formik.errors.dob)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" fullWidth />
                )}
              />
            </DemoItem>
            {formik.touched.dob && formik.errors.dob && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.dob}
              </FormHelperText>
            )}
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Qualification"
              variant="outlined"
              {...formik.getFieldProps("qualification")}
              error={Boolean(
                formik.touched.qualification && formik.errors.qualification
              )}
              fullWidth
            />
            {formik.touched.qualification && formik.errors.qualification && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.qualification}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Skill"
              variant="outlined"
              {...formik.getFieldProps("skill")}
              error={Boolean(formik.touched.skill && formik.errors.skill)}
              fullWidth
            />
            {formik.touched.skill && formik.errors.skill && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.skill}
              </FormHelperText>
            )}
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              {...formik.getFieldProps("city")}
              error={Boolean(formik.touched.city && formik.errors.city)}
              fullWidth
            />
            {formik.touched.city && formik.errors.city && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.city}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              {...formik.getFieldProps("country")}
              error={Boolean(formik.touched.country && formik.errors.country)}
              fullWidth
            />
            {formik.touched.country && formik.errors.country && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.country}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              {...formik.getFieldProps("address")}
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
            />
            {formik.touched.address && formik.errors.address && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.address}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="About"
              multiline
              rows={3}
              variant="outlined"
              {...formik.getFieldProps("about")}
              error={Boolean(formik.touched.about && formik.errors.about)}
              fullWidth
            />
            {formik.touched.about && formik.errors.about && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.about}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={formik.submitForm}>
          Signup
        </Button>
      </Container>
      <AlertBox
        open={open}
        severity="success"
        message="User has created successfully."
      />
    </>
  );
};
