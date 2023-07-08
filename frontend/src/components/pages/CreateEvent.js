import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Axios } from "../../Axios";
import AlertBox from "../ui/AlertBox";

export const CreateEvent = () => {
  const { token, _id } = useSelector((state) => state?.userReducer);
  const [open, setOpen] = useState("");

  // yup validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    detail: Yup.string().required("Detail is required"),
    description: Yup.string().required("Description is required"),
    banner: Yup.string().required("Banner is required"),
    duration: Yup.string().required("Duration is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    type: Yup.string().required("Type is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    noOfAssignments: Yup.string().required("No Of Assigments is required"),
  });

  const handleSubmit = (values) => {
    console.log(values, "this");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    Axios.post(
      `/event/add-event`,
      {
        ...values,
      },
      config
    )
      .then((res) => {
        setOpen("success");
        let interval = setTimeout(() => setOpen(""), 3000);
        formik.resetForm();
        return () => {
          clearTimeout(interval);
        };
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      detail: "",
      type: "",
      duration: "",
      country: "",
      city: "",
      noOfAssignments: "",
      banner: "",
      startDate: "",
      endDate: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box sx={{ paddingBlock: "40px" }}>
      <Container>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 500 }} mb={3}>
          Create Event
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              placeholder="Title"
              {...formik.getFieldProps("title")}
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
            />
            {formik.touched.title && formik.errors.title && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.title}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              label="Description"
              variant="outlined"
              placeholder="Description"
              {...formik.getFieldProps("description")}
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              fullWidth
            />
            {formik.touched.description && formik.errors.description && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.description-login"
              >
                {formik.errors.description}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              label="Type"
              variant="outlined"
              placeholder="Type"
              {...formik.getFieldProps("type")}
              error={Boolean(formik.touched.type && formik.errors.type)}
              fullWidth
            />
            {formik.touched.type && formik.errors.type && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.type-login"
              >
                {formik.errors.type}
              </FormHelperText>
            )}
          </Grid>

          <Grid item md={6} xs={12}>
            {" "}
            <TextField
              label="Duration"
              variant="outlined"
              placeholder="Duration"
              {...formik.getFieldProps("duration")}
              error={Boolean(formik.touched.duration && formik.errors.duration)}
              fullWidth
            />
            {formik.touched.duration && formik.errors.duration && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.duration-login"
              >
                {formik.errors.duration}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {" "}
            <TextField
              label="No Of Assigments"
              variant="outlined"
              placeholder="No Of Assigments"
              {...formik.getFieldProps("noOfAssignments")}
              error={Boolean(
                formik.touched.noOfAssignments && formik.errors.noOfAssignments
              )}
              fullWidth
            />
            {formik.touched.noOfAssignments &&
              formik.errors.noOfAssignments && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-urdu.noOfAssignments-login"
                >
                  {formik.errors.noOfAssignments}
                </FormHelperText>
              )}
          </Grid>
          <Grid item md={6} xs={12}>
            {" "}
            <TextField
              label="City"
              variant="outlined"
              placeholder="City"
              {...formik.getFieldProps("city")}
              error={Boolean(formik.touched.city && formik.errors.city)}
              fullWidth
            />
            {formik.touched.city && formik.errors.city && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.city-login"
              >
                {formik.errors.city}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {" "}
            <TextField
              label="Country"
              variant="outlined"
              placeholder="Country"
              {...formik.getFieldProps("country")}
              error={Boolean(formik.touched.country && formik.errors.country)}
              fullWidth
            />
            {formik.touched.country && formik.errors.country && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.country-login"
              >
                {formik.errors.country}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {" "}
            <TextField
              label="Start Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Start Date"
              {...formik.getFieldProps("startDate")}
              error={Boolean(
                formik.touched.startDate && formik.errors.startDate
              )}
              fullWidth
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.startDate-login"
              >
                {formik.errors.startDate}
              </FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {" "}
            <TextField
              label="End Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="End Date"
              {...formik.getFieldProps("endDate")}
              error={Boolean(formik.touched.endDate && formik.errors.endDate)}
              fullWidth
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.endDate-login"
              >
                {formik.errors.endDate}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              label="Detail"
              variant="outlined"
              multiline
              rows={6}
              placeholder="Detail"
              {...formik.getFieldProps("detail")}
              error={Boolean(formik.touched.detail && formik.errors.detail)}
              fullWidth
            />
            {formik.touched.detail && formik.errors.detail && (
              <FormHelperText
                error
                id="standard-weight-helper-text-urdu.detail-login"
              >
                {formik.errors.detail}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Banner</InputLabel>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => formik.setFieldValue("banner", base64)}
              />
              {formik.touched.banner && formik.errors.banner && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-urdu.banner-login"
                >
                  {formik.errors.banner}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBlock: "30px",
          }}
        >
          <Button variant="contained" type="submit" onClick={formik.submitForm}>
            Create
          </Button>
          <Button variant="outlined" href="/event">
            Back
          </Button>
        </Box>
        <AlertBox
          open={open == "success"}
          severity={"success"}
          message="Event has been created successfully"
        />
      </Container>
    </Box>
  );
};
