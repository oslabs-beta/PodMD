const config = require('./configController');
const queryPrometheus = require('../services/prometheusService');
const deletePod = require('./kubeController');
console.log('Prometheus Controller Running!');

const callInterval = 0.3;

const restartedPods = [];

const prometheusController = {};

prometheusController.fetchGraphData = async (req, res, next) => {
  try {
    const graphMinutes = req.query.graphMinutes;
    const cpuQuery = `
  avg(rate(container_cpu_usage_seconds_total[${graphMinutes}m])) by (pod, namespace)/
  sum(kube_pod_container_resource_requests{resource="cpu"}) by (pod, namespace) * 100
  `;
    const memQuery = `sum(avg_over_time(container_memory_usage_bytes[${graphMinutes}m])) by (pod, namespace)
    /
    sum(kube_pod_container_resource_requests{resource="memory"}) by (pod, namespace) * 100
    `;
    const cpuData = await queryPrometheus(cpuQuery);
    const memData = await queryPrometheus(memQuery);
    res.locals.data = { cpuData, memData };
    return next();
  } catch (err) {
    return next(err);
  }
};

const checkRestart = async (obj) => {
  console.log(obj);
  const { threshold, queryString, label } = obj;
  console.log(`LOOK HERE: ${queryString}`);
  const data = await queryPrometheus(queryString);
  if (data.status === 'success') {
    const results = data.data.result;
    console.log(`PromQL ${label} data array:`, results);
    results.forEach((pod) => {
      if (
        pod.value[1] > threshold &&
        pod.metric.pod !== 'prometheus-prometheus-kube-prometheus-prometheus-0'
      ) {
        console.log(
          `${pod.metric.pod} pod ${label} usage of ${
            Math.floor(pod.value[1] * 100) / 100
          }% exceeds threshold of ${threshold}%. Deleting ${pod.metric.pod}`
        );
        restartedPods.push({
          timestamp: new Date(),
          namespace: pod.metric.namespace,
          podName: pod.metric.pod,
          label,
          value: pod.value[1],
          threshold,
        });
        console.log(restartedPods);
        deletePod(pod.metric.pod, pod.metric.namespace);
      }
    });
  } else {
    console.error(`PromQL ${label} query failed:`, data.error);
  }
};

const restartChecks = async (configObj) => {
  await checkRestart(configObj.cpu);
  await checkRestart(configObj.memory);
};
setInterval(() => restartChecks(config.config), 1000 * 60 * callInterval);
module.exports = { restartedPods, prometheusController };
