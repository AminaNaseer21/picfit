const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const mlModel = require('./mlModel');

exports.predict = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const model = await mlModel.loadModel();
    // Assume input data is sent in request body for simplicity
    const inputData = request.body.data;
    const tensor = tf.tensor(inputData); // Convert to tensor
    const prediction = model.predict(tensor);

    response.send({prediction: prediction.arraySync()});
  });
});
