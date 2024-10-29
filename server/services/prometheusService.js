const fetch = require('node-fetch');

const prometheusUrl = 'localhost';
const docker = 'docker.host.internal';

const runDemo = true;

let demoHasRun = false;

const demoPod = 'kube-apiserver-minikube';

const queryPrometheus = async (queryStr, threshold) => {
  try {
    const encodedUrl = `http://localhost:9090/api/v1/query?query=${encodeURIComponent(
      queryStr
    )}`;
    const response = await fetch(encodedUrl);
    const data = await response.json();
    if (runDemo === true) {
      if (demoPod.length === 0)
        throw new Error('ERROR: app set to demo-mode but no pod name entered');
      for (const pod of data.data.result) {
        if (pod.metric.pod === demoPod && demoHasRun === false) {
          pod.value[1] = 75 + Math.random() * 5;
          if (pod.value[1] > threshold) demoHasRun = true;
        } else {
          pod.value[1] = 40 + Math.random() * 10;
        }
      }
    }
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = { queryPrometheus, runDemo };
