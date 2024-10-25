import React from 'react';
import Graph from './Graph';

const GraphsContainer = ({ graphMinutes, setGraphMinutes, cpuData, memoryData }) => {
  return(
    <div className='graphs'>
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

export default GraphsContainer;