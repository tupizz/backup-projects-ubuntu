const cv = require("opencv4nodejs");
const { resolve } = require("path");

const { runVideoFaceDetection } = require("./commons");

const videoFile = resolve(__dirname, "videos", "harrypotter_train.mp4");

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

function detectFaces(img) {
  // restrict minSize and scaleFactor for faster processing
  const options = {
    minSize: new cv.Size(5, 5),
    scaleFactor: 1.05,
    minNeighbors: 10
  };
  return classifier.detectMultiScaleGpu(img.bgrToGray(), options).objects;
}

runVideoFaceDetection(videoFile, detectFaces);
