import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './client/components/Navbar';
import './style.css';
import ParameterContainer from './client/components/ParameterContainer';
import GraphsContainer from './client/components/GraphsContainer';
import RestartedPodTable from './client/components/RestartedPodTable';
import halfLogo from './client/assets/halfLogo.png';

const App = () => {
  const [memory, setMemory] = useState(80);
  const [memTimeFrame, setMemTimeFrame] = useState(30);
  const [cpu, setCpu] = useState(80);
  const [cpuTimeFrame, setCpuTimeFrame] = useState(30);
  const [savedConfiguration, setSavedConfiguration] = useState({
    savedMemoryThreshold: 80,
    savedMemTimeFrame: 30,
    savedCpuThreshold: 80,
    savedCpuTimeFrame: 30,
  });

  const [memoryData, setMemoryData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [cpuGraphMinutes, setCpuGraphMinutes] = useState(60);
  const [memoryGraphMinutes, setMemoryGraphMinutes] = useState(60);
  const [restartedPods, setRestartedPods] = useState([]);

  const queryCpuData = async (minutes) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3333/graphData?cpuGraphMinutes=${minutes}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      const result = await response.json();
      setCpuData(result.cpuData.data.result);

      console.log('Graph data fetched successfully:', result);
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const queryMemoryData = async (minutes) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3333/graphData?memoryGraphMinutes=${minutes}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      const result = await response.json();
      setMemoryData(result.memData.data.result);

      console.log('Graph data fetched successfully:', result);
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const fetchRestartedPods = async () => {
    const res = await fetch('http://127.0.0.1:3333/restarted');
    console.log(res);
    const restartedPods = await res.json();
    console.log(restartedPods);
    setRestartedPods(restartedPods);
  };

  useEffect(() => {
    const restartedPodIntervalId = setInterval(fetchRestartedPods, 10000);
    return () => clearInterval(restartedPodIntervalId);
  }, []);

  const cpuGraphMinutesRef = useRef(cpuGraphMinutes);
  const memoryGraphMinutesRef = useRef(memoryGraphMinutes);

  useEffect(() => {
    cpuGraphMinutesRef.current = cpuGraphMinutes;
    memoryGraphMinutesRef.current = memoryGraphMinutes;
  }, [cpuGraphMinutes, memoryGraphMinutes]);

  useEffect(() => {
    queryCpuData(cpuGraphMinutes);
    queryMemoryData(memoryGraphMinutes);

    const intervalId = setInterval(() => {
      queryCpuData(cpuGraphMinutesRef.current);
      queryMemoryData(memoryGraphMinutesRef.current);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    queryMemoryData(memoryGraphMinutes);
  }, [memoryGraphMinutes]);

  useEffect(() => {
    queryCpuData(cpuGraphMinutes);
  }, [cpuGraphMinutes]);

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
        savedMemoryThreshold: result.memory.threshold,
        savedMemTimeFrame: result.memory.minutes,
        savedCpuThreshold: result.cpu.threshold,
        savedCpuTimeFrame: result.cpu.minutes,
      });
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
      <div id='LogoBox' style={{ textAlign: 'center', margin: '20px 0' }}>
        <img
          id='logo'
          src={halfLogo}
          alt='Logo'
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
        cpuGraphMinutes={cpuGraphMinutes}
        memoryGraphMinutes={memoryGraphMinutes}
        setCpuGraphMinutes={setCpuGraphMinutes}
        setMemoryGraphMinutes={setMemoryGraphMinutes}
        cpuData={cpuData}
        memoryData={memoryData}
        queryCpuData={queryCpuData}
        queryMemoryData={queryMemoryData}
      />
      {restartedPods.length > 0 ? (
        <RestartedPodTable restartedPods={restartedPods} />
      ) : null}
    </div>
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);
