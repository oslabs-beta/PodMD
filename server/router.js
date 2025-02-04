const express = require('express');
const path = require('path');
const app = express();
const PORT = 3333;
const cors = require('cors');
const {
  restartedPods,
  prometheusController,
} = require('./controllers/prometheusController');

const { configController } = require('./controllers/configController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/assets')));
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/restarted', (req, res) => {
  res.status(200).json(restartedPods);
});

app.get('/graphData', prometheusController.fetchGraphData, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.post('/config', configController.saveConfig, (req, res) => {
  res.status(201).json(res.locals.savedConfig);
});

app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'App caught unknown middleware error.',
    status: 500,
    message: {
      err: 'An error occurred, please try again.',
    },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.error(errObj.log);
  res.status(errObj.status).json(errObj.message);
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;



