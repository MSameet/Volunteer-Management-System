import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import CloseIcon from "@mui/icons-material/Close";
import { Axios } from "../../Axios";

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [banner, setBanner] = useState({});
  //   console.log("🚀 ~ file: CreateEvent.js:17 ~ CreateEvent ~ banner", banner);

  function create_event() {
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    Axios.post(
      `/event/add-event`,
      {
        title,
        description,
        banner,
      },
      config
    )
      .then((res) => {
        if (res.data) {
          setSuccess("Event is created");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Box sx={{ paddingBlock: "40px" }}>
      <Container>
        <Typography variant="h3" component="h2" sx={{ textAlign: "center" }}>
          Create Event
        </Typography>
        <Box sx={{ marginBlock: "40px" }} fullWidth>
          <img
            src="/assets/i/event-image.webp"
            style={{ width: "100%", height: "500px" }}
          />
        </Box>
        <TextField
          label="Title"
          variant="outlined"
          placeholder="Title"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Multiline"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ marginTop: "20px" }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ marginTop: "30px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setBanner(base64)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBlock: "30px",
          }}
        >
          <Button variant="contained" onClick={create_event}>
            Create
          </Button>
          <Button variant="outlined" href="/admin">
            Back
          </Button>
        </Box>
        <Collapse in={success}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {success}
          </Alert>
        </Collapse>
      </Container>
    </Box>
  );
};
