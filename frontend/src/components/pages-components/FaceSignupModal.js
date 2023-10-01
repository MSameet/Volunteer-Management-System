import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal } from "@mui/material";
import React from "react";
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
export const FaceSignupModal = ({
  open,
  handleClose,
  screenshot,
  setCameraStatus,
  cameraStatus,
  setScreenshot,
  dimensions,
  setDimensions,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="login__modal"
    >
      <Box sx={style}>
        <div className="d-flex align-items-center justify-content-end">
          <Button variant="link" onClick={handleClose}>
            <CloseIcon fontSize="medium" />
          </Button>
        </div>
        <Camera
          screenshot={screenshot}
          setScreenshot={setScreenshot}
          dimensions={dimensions}
          setDimensions={setDimensions}
          setCameraStatus={setCameraStatus}
          cameraStatus={cameraStatus}
        />
      </Box>
    </Modal>
  );
};
