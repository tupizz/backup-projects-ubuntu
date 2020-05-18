require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs-node');
const loadCSV = require('../../common/load-csv');

function knn(features, labels, predictionPoint, k) {
  const { mean, variance } = tf.moments(features, 0);

  // sqft_lot vai de 520 ~ 1651359
  // Normalização: deixa os valores de uma faixa de 0 e 1
  // Standardized vai de -1 (desvio padrão) à 1, eliminando os outliers
  // standardization: value - média / desvioPadrão --> value - média / sqrt(variance)
  const scaledPrediction = predictionPoint.sub(mean).div(variance.sqrt());

  return (
    features
      .sub(mean)
      .div(variance.sqrt())
      .sub(scaledPrediction)
      .pow(2)
      .sum(1)
      .sqrt()
      .expandDims(1)
      .concat(labels, 1)
      .unstack()
      .sort((a, b) => (a.bufferSync().get(0) > b.bufferSync().get(0) ? 1 : -1))
      .slice(0, k)
      .reduce((acc, pair) => acc + pair.bufferSync().get(1), 0) / k
  );
}

let { features, labels, testFeatures, testLabels } = loadCSV(
  'kc_house_data.csv',
  {
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat', 'long', 'sqft_lot', 'sqft_living'],
    labelColumns: ['price']
  }
);

features = tf.tensor(features);
labels = tf.tensor(labels);

testFeatures.forEach((testPoint, i) => {
  const result = knn(features, labels, tf.tensor(testPoint), 10);
  const err = (testLabels[i][0] - Number(result)) / testLabels[i][0];
  // console.log('Guess', result, testLabels[i][0]);
  console.log('Error =>', Math.abs((err * 100).toFixed(2)), '%');
});
