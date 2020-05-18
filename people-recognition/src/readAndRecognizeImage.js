const cv = require("opencv4nodejs");
const { resolve } = require("path");
const fs = require("fs");
const { drawBlueRect } = require("./utils");

(function run() {
  const imagePath = resolve(__dirname, "images");
  const imgFiles = fs.readdirSync(imagePath);

  function processaImagem(imageFileName) {
    const imagemCV = cv.imread(resolve(imagePath, imageFileName));
    const imagemCVGrey = imagemCV.bgrToGray();

    detectaPessoa(imagemCVGrey, imagemCV);
  }

  function detectaPessoa(imageGrey, imageOriginal) {
    const classifier = new cv.CascadeClassifier(cv.HAAR_PROFILEFACE);
    const faceRects = classifier.detectMultiScale(imageGrey).objects;

    if (!faceRects.length) {
      return;
    }

    faceRects.map(faceRect => {
      drawBlueRect(imageOriginal, faceRect);
    });

    cv.imshowWait("face detection", imageOriginal);
  }

  imgFiles.map(imageFileName => {
    processaImagem(imageFileName);
  });
})();

// let faceImageRect = imageOriginal.getRegion(faceRect).resize(80, 80);

// cv.imwrite(
//   resolve(
//     __dirname,
//     "outputs",
//     `foto-${Math.floor(Math.random() * 500)}.jpeg`
//   ),
//   faceImageRect
// );
