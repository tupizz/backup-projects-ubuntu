const cv = require("opencv4nodejs");
const { resolve } = require("path");
const fs = require("fs");
const { drawGreenRect } = require("./utils");

const imagePath = resolve(__dirname, "images", "nathaly");

function processaImagem(imageFileName) {
  const imagemCV = cv
    .imread(resolve(imagePath, imageFileName))
    .resizeToMax(600);

  const imagemCVGrey = imagemCV.bgrToGray();

  return { imagemCVGrey, imagemCV };
}

function detectaPessoa(imageGrey, imageOriginal) {
  const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
  const faceRects = classifier.detectMultiScale(imageGrey).objects;

  if (!faceRects.length) {
    return;
  }

  faceRects.map(faceRect => {
    drawGreenRect(imageOriginal, faceRect);
  });

  cv.imshowWait("face detection", imageOriginal);
}

function run() {
  const imgFiles = fs.readdirSync(imagePath);

  imgFiles
    .map(imageFileName => processaImagem(imageFileName))
    .map(imgObj => detectaPessoa(imgObj.imagemCVGrey, imgObj.imagemCV));
}

run();
