const path = require("path");
const fs = require("fs");
const fr = require("face-recognition");
const cv = require("opencv4nodejs");

const classNames = ["harry", "rony", "hermione"];

// reading all files from samples
const allSampleFiles = fs.readdirSync(path.resolve(__dirname, "samples"));

let i = 0;
const imagesByClass = classNames.map(className =>
  allSampleFiles
    .filter(file => file.includes(className))
    .map(file => path.join(path.resolve(__dirname, "samples"), file))
    .map(fp => {
      const image = fr.loadImage(fp);

      // fs.existsSync(className) ? null : fs.mkdirSync(className);

      // fr.saveImage(`./${className}/teste${++i}`, image, true);

      return image;
    })
);

const numTrainingFaces = 6;

// 7 imagens para treinar
const trainDataByClass = imagesByClass.map(imgs =>
  imgs.slice(0, numTrainingFaces)
);

// Testar com 3 imagens
const testDataByClass = imagesByClass.map(imgs => imgs.slice(numTrainingFaces));

const recognizer = fr.FaceRecognizer();

trainDataByClass.forEach((faces, label) => {
  const name = classNames[label];
  recognizer.addFaces(faces, name);
});

const modelState = recognizer.serialize();
fs.writeFileSync("model.json", JSON.stringify(modelState));

// modelState = require("./../model.json");
// recognizer.load(modelState);

const errors = classNames.map(_ => []);
testDataByClass.forEach((faces, label) => {
  const name = classNames[label];
  console.log();
  console.log("testing %s", name);
  faces.forEach((face, i) => {
    const prediction = recognizer.predictBest(face);
    console.log("%s (%s)", prediction.className, prediction.distance);

    const resultadoClassificao = prediction.className;

    if (!fs.existsSync(`result/${resultadoClassificao}`)) {
      fs.mkdirSync(`result/${resultadoClassificao}`);
    }

    fr.saveImage(
      `./result/${resultadoClassificao}/${resultadoClassificao}${++i}`,
      face,
      true
    );

    // count number of wrong classifications
    if (prediction.className !== name) {
      errors[label] = errors[label] + 1;
    }
  });
});

// print the result
const result = classNames.map((className, label) => {
  const numTestFaces = testDataByClass[label].length;
  const numCorrect = numTestFaces - errors[label].length;
  const accuracy = parseInt((numCorrect / numTestFaces) * 10000) / 100;
  return `${className} ( ${accuracy}% ) : ${numCorrect} of ${numTestFaces} faces have been recognized correctly`;
});
console.log("result:");
console.log(result);
