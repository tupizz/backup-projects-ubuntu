const { grabFrames, drawBlueRectWithText, drawGreenRect } = require("./utils");
const { resolve } = require("path");
const cv = require("opencv4nodejs");
const fr = require("face-recognition").withCv(cv);

const modelState = require("./../model.json");

const recognizer = fr.FaceRecognizer();
recognizer.load(modelState);

exports.runVideoFaceDetection = (src, detectFaces) =>
  grabFrames(src, 1, frame => {
    console.time("detection and run classification time");
    const frameResized = frame.resizeToMax(800);

    // detect faces
    const faceRects = detectFaces(frameResized);
    if (faceRects.length) {
      // draw detection
      faceRects.forEach(faceRect => {
        const imgRGB = fr.cvImageToImageRGB(
          fr.CvImage(frameResized.getRegion(faceRect).resize(150, 150))
        );
        const result = recognizer.predictBest(imgRGB);

        drawBlueRectWithText(frameResized, faceRect, result.className);

        drawGreenRect(frameResized, faceRect);
      });
    }

    cv.imshow("CLASSIFICAÇÃO E RECONHECIMENTO FACIAL", frameResized);
    console.timeEnd("detection and run classification time");
  });

// let faceImageRect = imageOriginal.getRegion(faceRect).resize(80, 80);

// cv.imwrite(
//   resolve(
//     __dirname,
//     "outputs",
//     `foto-${Math.floor(Math.random() * 500)}.jpeg`
//   ),
//   faceImageRect
// );
