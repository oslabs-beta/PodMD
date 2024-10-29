const { config } = require('./configController');
const { queryPrometheus, runDemo } = require('../services/prometheusService');
const deletePod = require('./kubeController');
console.log('Prometheus Controller Running!');

const callInterval = 0.3;

const restartedPods = [];

const prometheusController = {};

prometheusController.fetchGraphData = async (req, res, next) => {
  try {
    if (runDemo) {
      await checkRestart(config.cpu);
      await checkRestart(config.memory);
    }
    const cpuGraphMinutes = req.query.cpuGraphMinutes;
    const memoryGraphMinutes = req.query.memoryGraphMinutes;

    let cpuData, memData;

    if (cpuGraphMinutes) {
      const cpuQuery = `
      avg(rate(container_cpu_usage_seconds_total[${cpuGraphMinutes}m])) by (pod, namespace)/
      sum(kube_pod_container_resource_requests{resource="cpu"}) by (pod, namespace) * 100
      `;
      cpuData = await queryPrometheus(cpuQuery, config.cpu.threshold);
      res.locals.data = { cpuData };
    }
    if (memoryGraphMinutes) {
      const memQuery = `sum(avg_over_time(container_memory_usage_bytes[${memoryGraphMinutes}m])) by (pod, namespace)
    /
    sum(kube_pod_container_resource_requests{resource="memory"}) by (pod, namespace) * 100
    `;
      memData = await queryPrometheus(memQuery, config.memory.threshold);
      res.locals.data = { memData };
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

const checkRestart = async (obj) => {
  const { threshold, queryString, label } = obj;
  const data = await queryPrometheus(queryString, threshold);
  if (data.status === 'success') {
    const results = data.data.result;
    results.forEach((pod) => {
      if (
        pod.value[1] > threshold &&
        pod.metric.pod !== 'prometheus-prometheus-kube-prometheus-prometheus-0'
      ) {
        restartedPods.push({
          timestamp: new Date(),
          namespace: pod.metric.namespace,
          podName: pod.metric.pod,
          label,
          value: pod.value[1],
          threshold,
        });
        console.log(
          `deleting with threshold of ${threshold} and value of ${pod.value[1]}`
        );
        deletePod(pod.metric.pod, pod.metric.namespace);
      }
    });
    console.log(restartedPods);
  } else {
    console.error(`PromQL ${label} query failed:`, data.error);
  }
};

const restartChecks = async (config) => {
  // invoke Promise.all and pass in the function invocations with arguments in the order it needs to be run in an array
  await Promise.all([checkRestart(config.cpu), checkRestart(config.memory)]);
};
setInterval(() => restartChecks(config), 1000 * 60 * callInterval);
module.exports = { restartedPods, prometheusController };
