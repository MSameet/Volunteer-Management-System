import { Button } from "@mui/material";
import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { detectFaces } from "../../data/detectFaces";

export const Camera = ({
  dimensions,
  setDimensions,
  screenshot,
  setScreenshot,
  cameraStatus,
  setCameraStatus,
}) => {
  const webcamRef = useRef();

  const [styles, setStyles] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef();
  const canvasRef = useRef();
  const previewRef = useRef();
  console.log(isScanning);

  const getScreenshotDims = (blob) => {
    return new Promise((resolved, rejected) => {
      const i = new Image();
      i.onload = () => resolved({ blobW: i.width, blobH: i.height });
      i.src = blob;
    });
  };

  const cropImage = (imgW, imgH) => {
    const css = {};
    const contW = containerRef.current.clientWidth;
    const contH = containerRef.current.clientHeight;
    const scaledW = Math.round((imgW * contH * 100) / imgH) / 100;
    const scaledH = Math.round((imgH * contW * 100) / imgW) / 100;
    const left = Math.round((contW - scaledW) * 50) / 100;
    const top = Math.round((contH - scaledH) * 50) / 100;

    if (scaledW <= contW) {
      css["preview"] = { width: "100%", height: "550px", top: 0, left: 0 };
      css["canvas"] = { top: 0, left: 0 };
    } else {
      css["preview"] = { width: "100%", height: "550px", top, left: 0 };
      css["canvas"] = { top, left: 0 };
    }
    setStyles(css);
  };

  const handleScreenshot = async (blob) => {
    const { blobW, blobH } = await getScreenshotDims(blob);
    cropImage(blobW, blobH);
    setIsScanning(true);
    detectFaces({ previewRef, canvasRef })
      .then((r) => {
        const faces = r;

        if (faces && faces.length > 0) {
          let options = {
            lineWidth: 4,
            boxColor:
              faces.length === 1 && faces[0].detection.score > 0.75
                ? "#00ff00"
                : "#f00000",
            drawLabelOptions: { fontColor: "#1e40af" },
          };
          setDimensions(Object.values(faces[0].descriptor));
          faces.map((face) => {
            const box = face.detection.box;
            options["label"] =
              "Score: " + Math.round(face.detection.score * 100) / 100;

            const drawBox = new faceapi.draw.DrawBox(box, options);
            return drawBox.draw(canvasRef.current);
          });
        }
        setCameraStatus("");
        setIsScanning(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (screenshot != null) {
      handleScreenshot(screenshot);
    }
  }, [screenshot]);

  return (
    <div
      className="camera_container"
      style={{ backgroundImage: 'url("/assets/i/camera.jpg")' }}
      ref={containerRef}
    >
      {isScanning ? (
        <div className=" scanning__preview d-flex align-items-center justify-content-center">
          <img src="/assets/i/scanner.gif" alt="" />
        </div>
      ) : (
        cameraStatus == "open" && (
          <Webcam
            className="camera-video"
            id="webcam"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            width={"100%"}
            height={500}
            mirrored={true}
            videoConstraints={{ facingMode: "user" }}
          >
            {({ getScreenshot }) => (
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  variant="outlined"
                  onClick={() => {
                    const imageSrc = getScreenshot();
                    setScreenshot(imageSrc);
                  }}
                >
                  Capture photo
                </Button>
              </div>
            )}
          </Webcam>
        )
      )}

      <div className="preview">
        {screenshot != null && (
          <>
            <canvas id="preview-canvas" ref={canvasRef} style={styles?.canvas}>
              Your browser does not support the HTML canvas tag.
            </canvas>
            <img
              ref={previewRef}
              src={screenshot}
              alt="preview"
              style={styles?.preview}
              onLoad={() => handleScreenshot(screenshot)}
            />
          </>
        )}
      </div>
    </div>
  );
};
