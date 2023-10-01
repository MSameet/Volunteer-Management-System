import {
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Axios } from "../../Axios";
import AlertBox from "../ui/AlertBox";

// styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  boxShadow: "0 0 20px 0 rgba(188,209,218,.31)",
  border: "1px solid rgba(126,151,172,.15)",
  marginBlock: "18px",
}));
const EditProfile = () => {
  const { user } = useSelector((state) => state?.userReducer);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // volunteer validationSchema
  const volunteerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    dob: Yup.string().required("Date of Birth is required"),
    age: Yup.string().required("Age is required"),
    qualification: Yup.string().required("Qualification is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Full Address is required"),
    skill: Yup.string().required("Skill is required"),
    about: Yup.string().required("About is required"),
  });
  //   organizer validation schema
  const organizerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Full Address is required"),
    type: Yup.string().required("Type is required"),
    about: Yup.string().required("About is required"),
  });
  let volunteerInitialValue = {
    name: user?.name,
    username: user?.username,
    email: user?.email,
    dob: user?.dob,
    age: user?.age,
    country: user?.country,
    city: user?.city,
    address: user?.address,
    qualification: user?.qualification,
    avatar: user?.avatar,
    skill: user?.skill,
    phoneNumber: user?.phoneNumber,
    about: user?.about,
  };

  let organizerInitialValue = {
    name: user?.name,
    username: user?.username,
    email: user?.email,
    type: user?.type,
    country: user?.country,
    city: user?.city,
    address: user?.address,
    avatar: user?.avatar,
    phoneNumber: user?.phoneNumber,
    about: user?.about,
  };

  let finalInitialValues = {
    volunteer: volunteerInitialValue,
    organizer: organizerInitialValue,
    admin: volunteerInitialValue,
  };
  let finalSchema = {
    volunteer: volunteerValidationSchema,
    organizer: organizerValidationSchema,
    admin: volunteerValidationSchema,
  };
  const handleSubmit = (values) => {
    setOpen(false);
    let url = "";
    if (user?.role == "volunteer" || user?.role == "admin") {
      url += `/user/update-user?_id=${user?._id}`;
    }
    if (user?.role == "organizer") {
      url += `/organiser/edit-organiser?_id=${user?._id}`;
    }
    Axios.patch(url, {
      ...values,
    })
      .then((res) => {
        setOpen(true);
        console.log(res.data);
        let interval = setTimeout(() => {
          setOpen(false);
          navigate(-1);
        }, 3000);
        return () => {
          clearTimeout(interval);
        };
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: finalInitialValues[user.role],
    validationSchema: finalSchema[user?.role],
    onSubmit: handleSubmit,
  });
  return (
    <Container mt={3}>
      <Item>
        <Typography variant="h4" mb={3}>
          Edit Profile
        </Typography>
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
          {(user?.role == "volunteer" || user?.role == "admin") && (
            <>
              {" "}
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
                <TextField
                  id="outlined-basic"
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...formik.getFieldProps("dob")}
                  error={Boolean(formik.touched.dob && formik.errors.dob)}
                  fullWidth
                />
                {formik.touched.dob && formik.errors.dob && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-urdu.description-login"
                  >
                    {formik.errors.dob}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
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
                {formik.touched.qualification &&
                  formik.errors.qualification && (
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
            </>
          )}

          {user?.role == "organizer" && (
            <Grid item xs={12}>
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
          )}
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
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={formik.submitForm}>
          Update
        </Button>
      </Item>
      <AlertBox
        severity="success"
        open={open}
        message="User has been successfully updated."
      />
    </Container>
  );
};

export default EditProfile;
