const fetch = require('node-fetch');

const prometheusUrl = 'localhost';
const docker = 'docker.host.internal';

const runDemo = false;
const demoPod = 'kube-apiserver-minikube';

const queryPrometheus = async (queryStr) => {
  try {
    const encodedUrl = `http://localhost:9090/api/v1/query?query=${encodeURIComponent(queryStr)}`;
    const response = await fetch(encodedUrl);
    const data = await response.json();
    if (runDemo === true) {
      if (demoPod.length === 0)
        console.log('ERROR: server set to demo but no demo pod name entered');
      for (const pod of data.data.result) {
        if (pod.metric.pod === demoPod) {
          pod.value[1] = 95 + Math.random() * 5;
        } else {
          pod.value[1] = Math.random() * 15;
        }
      }
    }
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = queryPrometheus;
