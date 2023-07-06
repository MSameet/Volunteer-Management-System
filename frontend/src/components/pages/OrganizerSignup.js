import {
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import FileBase from "react-file-base64";
import * as Yup from "yup";
import { Axios } from "../../Axios";

export const OrganizerSignup = ({ role }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Full Address is required"),
    avatar: Yup.string().required("Avatar is required"),
    type: Yup.string().required("Type is required"),
    about: Yup.string().required("About is required"),
  });

  const handleSubmit = (values) => {
    Axios.post(`/request/create-user-request`, {
      type: "user",
      data: { ...values, role },
    })
      .then((res) => {
        formik.resetForm();
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      type: "",
      country: "",
      city: "",
      address: "",
      avatar: "",
      password: "",
      phoneNumber: "",
      about: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Container>
      <Grid container spacing={2}>
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
            label="Type"
            variant="outlined"
            {...formik.getFieldProps("type")}
            error={Boolean(formik.touched.type && formik.errors.type)}
            fullWidth
          />
          {formik.touched.type && formik.errors.type && (
            <FormHelperText
              error
              id="standard-weight-helper-text-urdu.description-login"
            >
              {formik.errors.type}
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
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Avatar</InputLabel>
            <div className="uploader__box">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => formik.setFieldValue("avatar", base64)}
              />
              <img
                src={
                  formik.values.avatar
                    ? formik.values.avatar
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
      </Grid>
      <Button variant="contained" sx={{ mt: 2 }}>
        Signup
      </Button>
    </Container>
  );
};
