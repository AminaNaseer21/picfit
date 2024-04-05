const tf = require('@tensorflow/tfjs-node');
const modelPath = 'path/to/your/model.json'; // Update this path

let model;

exports.loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel(modelPath);
  }
  return model;
};
