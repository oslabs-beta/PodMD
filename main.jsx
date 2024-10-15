// LEAVE IN ROOT FOR VITE

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import ParameterContainer from './client/components/ParameterContainer';
import Graph from './client/components/Graph2';

const App = () => {
  const [memory, setMemory] = useState(0);
  const [memTimeFrame, setMemTimeFrame] = useState(1);
  const [cpu, setCpu] = useState(0);
  const [cpuTimeFrame, setCpuTimeFrame] = useState(1);

  const [memoryData, setMemoryData] = useState([]);
  const [cpuData, setCpuData] = useState([]);

  const [graphMinutes, setGraphMinutes] = useState(60);

  const fetchMemoryData = async () => {
    // const query = `sum(container_memory_usage_bytes) by (pod)`;
    const query = `avg_over_time(container_memory_usage_bytes[${graphMinutes}m]) by (pod) /
    sum(kube_pod_container_resource_requests_memory_bytes{pod=~".+"}) by (pod) * 100
    `;
    const res = await fetch(`http://localhost:9090/api/v1/query?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setMemoryData(data.data.result);
  };

  const fetchCpuData = async () => {
    // const query = `sum(rate(container_cpu_usage_seconds_total[${graphMinutes}m])) by (pod)`;
    const query = `
    avg(rate(container_cpu_usage_seconds_total[${graphMinutes}m])) by (pod)/
    sum(kube_pod_container_resource_requests_cpu_cores{pod=~".+"}) by (pod) * 100
    `;
    const res = await fetch(`http://localhost:9090/api/v1/query?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setCpuData(data.data.result);
  };

  useEffect(() => {
    fetchMemoryData(graphMinutes);
    fetchCpuData(graphMinutes);
  }, [graphMinutes]);

  // SAMPLE CLIENT DATA:
  // {
  //   "memory": 1024,
  //   "memTimeFrame": 30,
  //   "cpu": 4,
  //   "cpuTimeFrame": 15
  // }

  //function for submitting our new config
  const setConfiguration = async (memory, memTimeFrame, cpu, cpuTimeFrame) => {
    try {
      //deconstructing to get values
      const config = {
        memory,
        memTimeFrame,
        cpu,
        cpuTimeFrame,
      };
      // promise waiting on the fetch requst to the endpoint
      const response = await fetch('http://localhost:3333/config', {
        //post request from client side sends data to the server
        method: 'POST',
        // indicating that we are sending JSON data from client
        headers: {
          'Content-Type': 'application/json',
        },
        // convert the javascript object into a string
        body: JSON.stringify(config),
      });
      // if there is something wrong with the response
      if (!response.ok) {
        throw new Error('Failed to send configuration');
      }
      // parse the json reponse - What will we be responding with??
      const result = await response.json();
      console.log('Configuration saved successfully:', result);
      // error handler
    } catch (error) {
      console.error('Error sending configuration:', error);
    }
  };

  //function that runs when we click the submit button
  const handleSubmit = () => {
    console.log(`Memory: ${memory}, TimeFrame: ${memTimeFrame}`);
    console.log(`CPU: ${cpu}, TimeFrame: ${cpuTimeFrame}`);
    //invoke the set configuration function passing in the client submitted fields
    setConfiguration(memory, memTimeFrame, cpu, cpuTimeFrame);
  };

  return (
    <div>
      <ParameterContainer
        memory={memory}
        setMemory={setMemory}
        memTimeFrame={memTimeFrame}
        cpu={cpu}
        setCpu={setCpu}
        cpuTimeFrame={cpuTimeFrame}
        setCpuTimeFrame={setCpuTimeFrame}
        setMemTimeFrame={setMemTimeFrame}
      />
      <button id='saveButton' onClick={handleSubmit}>
        Save Config
      </button>

      <Graph
        title='Memory Usage'
        graphMinutes={graphMinutes}
        setGraphMinutes={setGraphMinutes}
        data={memoryData}
      />

      <Graph
        title='CPU Usage'
        graphMinutes={graphMinutes}
        setGraphMinutes={setGraphMinutes}
        data={cpuData}
      />
    </div>
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);
