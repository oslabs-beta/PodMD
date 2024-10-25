import React from 'react';
import Graph from './Graph';

const GraphsContainer = ({
  cpuGraphMinutes,
  memoryGraphMinutes,
  setCpuGraphMinutes,
  setMemoryGraphMinutes,
  cpuData,
  memoryData,
  queryCpuData,
  queryMemoryData,
}) => {
  const handleCpuSliderChange = (mins) => {
    setCpuGraphMinutes(mins);
    queryCpuData(mins);
  };

  const handleMemorySliderChange = (mins) => {
    setMemoryGraphMinutes(mins);
    queryMemoryData(mins);
  };

  return (
    <div className='graphs'>
      <Graph
        title='Memory Usage'
        memoryGraphMinutes={memoryGraphMinutes}
        setMemoryGraphMinutes={handleMemorySliderChange}
        data={memoryData}
      />
      <Graph
        title='CPU Usage'
        cpuGraphMinutes={cpuGraphMinutes}
        setCpuGraphMinutes={handleCpuSliderChange}
        data={cpuData}
      />
    </div>
  );
};

export default GraphsContainer;
