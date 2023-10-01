import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";
import { login } from "../../redux/reducer/userReducer";
import { Camera } from "./Camera";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const FaceLoginModal = ({
  open,
  handleClose,
  cameraStatus,
  setCameraStatus,
}) => {
  const [screenshot, setScreenshot] = useState(null);
  const [dimensions, setDimensions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    Axios.post("/user/face-recognition", { screenshot, descriptor: dimensions })
      .then((res) => {
        dispatch(login(res.data));
        if (res?.data?.user?.role == "volunteer") {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="login__modal"
    >
      <Box sx={style}>
        <Camera
          screenshot={screenshot}
          setScreenshot={setScreenshot}
          dimensions={dimensions}
          setDimensions={setDimensions}
          setCameraStatus={setCameraStatus}
          cameraStatus={cameraStatus}
        />
        {screenshot != null && (
          <Button variant="outlined" onClick={() => handleLogin()}>
            Login
          </Button>
        )}
      </Box>
    </Modal>
  );
};
