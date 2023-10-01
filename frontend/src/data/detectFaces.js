import * as faceapi from "face-api.js";

export const detectFaces = async (refs) => {
  const { previewRef, canvasRef } = refs;
  await faceapi.nets.ssdMobilenetv1.loadFromUri(
    "facenet/models/ssd_mobilenetv1"
  );
  await faceapi.nets.faceLandmark68Net.loadFromUri(
    "facenet/models/face_landmark_68"
  );
  await faceapi.nets.faceRecognitionNet.loadFromUri(
    "facenet/models/face_recognition"
  );
  const faces = await faceapi
    .detectAllFaces(previewRef.current)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const displaySize = {
    width: previewRef.current.width,
    height: previewRef.current.height,
  };
  faceapi.matchDimensions(canvasRef.current, displaySize);
  const resizedDetections = faceapi.resizeResults(faces, displaySize);
  return resizedDetections;
};
