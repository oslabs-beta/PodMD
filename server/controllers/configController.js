const prometheusQueries = require('../services/prometheusService');

let config = {
  cpu: {
    label: 'cpu',
    threshold: 80,
    minutes: 30,
    queryString: `
  avg(rate(container_cpu_usage_seconds_total[30m])) by (pod, namespace)/
  sum(kube_pod_container_resource_requests{resource="cpu"}) by (pod, namespace) * 100
  `,
  },
  memory: {
    label: 'memory',
    threshold: 80,
    minutes: 30,
    queryString: `sum(avg_over_time(container_memory_usage_bytes[30m])) by (pod, namespace)
    /
    sum(kube_pod_container_resource_requests{resource="memory"}) by (pod, namespace) * 100
    `,
  },
};

const configController = {};
configController.saveConfig = (req, res, next) => {
  try {
    const { memory, memTimeFrame, cpu, cpuTimeFrame } = req.body;

    config.cpu.threshold = cpu;
    config.cpu.minutes = cpuTimeFrame;
    config.cpu.queryString = `
  avg(rate(container_cpu_usage_seconds_total[${cpuTimeFrame}m])) by (pod, namespace)/
  sum(kube_pod_container_resource_requests{resource="cpu"}) by (pod, namespace) * 100
  `;
    config.memory.threshold = memory;
    config.memory.minutes = memTimeFrame;
    config.memory.queryString = `sum(avg_over_time(container_memory_usage_bytes[${memTimeFrame}m])) by (pod, namespace)
    /
    sum(kube_pod_container_resource_requests{resource="memory"}) by (pod, namespace) * 100
    `;

    res.locals.savedConfig = {
      cpu: { threshold: config.cpu.threshold, minutes: config.cpu.minutes },
      memory: {
        threshold: config.memory.threshold,
        minutes: config.memory.minutes,
      },
    };

    prometheusQueries();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { config, configController };
