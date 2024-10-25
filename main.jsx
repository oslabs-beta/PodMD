import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './client/components/Navbar';
import './style.css';
import ParameterContainer from './client/components/ParameterContainer';
import GraphsContainer from './client/components/GraphsContainer';
import RestartedPodTable from './client/components/RestartedPodTable';
import fullLogo from './client/assets/fullLogo.png';
import logoDesign from './client/assets/logoDesign.png';
import logoName from './client/assets/logoName.png';
import logoSlogan from './client/assets/logoSlogan.png';

const docker = 'host.docker.internal';
const localhost = 'localhost';

const App = () => {
  const [memory, setMemory] = useState(80);
  const [memTimeFrame, setMemTimeFrame] = useState(30);
  const [cpu, setCpu] = useState(80);
  const [cpuTimeFrame, setCpuTimeFrame] = useState(30);
  const [savedConfiguration, setSavedConfiguration] = useState({
    savedMemoryThreshold: 0,
    savedMemTimeFrame: 0,
    savedCpuThreshold: 0,
    savedCpuTimeFrame: 0,
  });

  const [memoryData, setMemoryData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [graphMinutes, setGraphMinutes] = useState(60);
  const [restartedPods, setRestartedPods] = useState([]);

  const queryChartData = async (graphMinutes) => {
    try {
      const response = await fetch(`http://localhost:3333/graphData?graphMinutes=${graphMinutes}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      const result = await response.json();
      setCpuData(result.cpuData.data.result);
      setMemoryData(result.memData.data.result);


      console.log('Graph data fetched successfully:', result);
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const fetchMemoryData = async () => {
    const query = `sum(avg_over_time(container_memory_usage_bytes[${graphMinutes}m])) by (pod)
    /
    sum(kube_pod_container_resource_requests{resource="memory"}) by (pod) * 100
    `;
    const res = await fetch(
      `http://${localhost}:9090/api/v1/query?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setMemoryData(data.data.result);
  };

  const fetchCpuData = async () => {
    const query = `
    avg(rate(container_cpu_usage_seconds_total[${graphMinutes}m])) by (pod)/
    sum(kube_pod_container_resource_requests{resource="cpu"}) by (pod) * 100
    `;
    const res = await fetch(
      `http://${localhost}:9090/api/v1/query?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setCpuData(data.data.result);
  };

  const fetchRestartedPods = async () => {
    const res = await fetch('http://localhost:3333/restarted');
    console.log(res);
    const restartedPods = await res.json();
    console.log(restartedPods);
    setRestartedPods(restartedPods);
  };

  useEffect(() => {
    const restartedPodIntervalId = setInterval(fetchRestartedPods, 10000);
    return () => clearInterval(restartedPodIntervalId);
  }, []);

  useEffect(() => {
    queryChartData(graphMinutes);
  }, [graphMinutes]);

  // SAMPLE CLIENT DA

  const setConfiguration = async (memory, memTimeFrame, cpu, cpuTimeFrame) => {
    try {
      const config = {
        memory,
        memTimeFrame,
        cpu,
        cpuTimeFrame,
      };
      const response = await fetch('http://localhost:3333/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error('Failed to send configuration');
      }
      const result = await response.json();
      console.log('Configuration saved successfully:', result);
      setSavedConfiguration({
        savedMemoryThreshold: result.memory.threshold,
        savedMemTimeFrame: result.memory.minutes,
        savedCpuThreshold: result.cpu.threshold,
        savedCpuTimeFrame: result.cpu.minutes,
      });
      // error handler
    } catch (error) {
      console.error('Error sending configuration:', error);
    }
  };

  const handleSubmit = () => {
    console.log(`Memory: ${memory}, TimeFrame: ${memTimeFrame}`);
    console.log(`CPU: ${cpu}, TimeFrame: ${cpuTimeFrame}`);
    console.log({ memory, memTimeFrame, cpu, cpuTimeFrame });
    setConfiguration(memory, memTimeFrame, cpu, cpuTimeFrame);
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <img
          src={fullLogo}
          alt='Logo'
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      <ParameterContainer
        handleSubmit={handleSubmit}
        memory={memory}
        setMemory={setMemory}
        memTimeFrame={memTimeFrame}
        cpu={cpu}
        setCpu={setCpu}
        cpuTimeFrame={cpuTimeFrame}
        setCpuTimeFrame={setCpuTimeFrame}
        setMemTimeFrame={setMemTimeFrame}
        savedConfiguration={savedConfiguration}
      />
      <GraphsContainer
        id='graphContain'
        graphMinutes={graphMinutes}
        setGraphMinutes={setGraphMinutes}
        cpuData={cpuData}
        memoryData={memoryData}
      />
      {restartedPods.length > 0 ? (
        <RestartedPodTable restartedPods={restartedPods} />
      ) : null}
    </div>
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);
