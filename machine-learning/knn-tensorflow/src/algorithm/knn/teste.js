// require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs-node');
// const loadCSV = require('../../common/load-csv');

// const features = tf.tensor([
//   [-121, 47],
//   [-121.2, 46.5],
//   [-122, 46.4],
//   [-120.9, 46.7]
// ]);

// const tensor = tf.tensor([1, 2]);

// const labels = tf.tensor([[200], [250], [215], [240]]);

// const predictionPoint = tf.tensor([-121, 47]);
// const k = 2;
// // aplicando a formula da distancia entre dois pontos
// const t = features
//   .sub(predictionPoint)
//   .pow(2)
//   .sum(1)
//   .sqrt()
//   .expandDims(1)
//   .concat(labels, 1)
//   .unstack()
//   .sort((a, b) => (a.bufferSync().get(0) > b.bufferSync().get(0) ? 1 : -1))
//   .slice(0, k)
//   .reduce((acc, pair) => acc + pair.bufferSync().get(1), 0);

// console.log(t);
