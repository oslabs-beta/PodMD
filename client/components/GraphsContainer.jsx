import React, { useState } from 'react';
import Graph from './Graph';
import { Refresh } from '@mui/icons-material';
import manualGraphRefresh from '../../main.jsx';
// client/components/GraphsContainer.jsx
// main.jsx
const GraphsContainer = ({
  cpuGraphMinutes,
  manualGraphRefresh,
  memoryGraphMinutes,
  setCpuGraphMinutes,
  setMemoryGraphMinutes,
  cpuData,
  memoryData,
  queryCpuData,
  queryMemoryData,
}) => {

  const [refreshHover, setRefreshHover] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const handleCpuSliderChange = (mins) => {
    setCpuGraphMinutes(mins);
    queryCpuData(mins);
  };

  const handleMemorySliderChange = (mins) => {
    setMemoryGraphMinutes(mins);
    queryMemoryData(mins);
  };

  const handleRefreshHover = () => {
    setRefreshHover(true);
  };

  const handleRefreshLeave = () => {
    setRefreshHover(false);
  };

  const handleRefreshClick = () => {
    setHasRefreshed(true);
    manualGraphRefresh();
    setTimeout(() => { setHasRefreshed(false); }, 2500);
  };

  return (
    <section className='graphs'>
      <section id='refresh-icon'>
        {(refreshHover ? (<Refresh onClick={handleRefreshClick} onMouseLeave={handleRefreshLeave} sx={{ color: "rgb(233,233,233)" }} />) : (<Refresh onClick={handleRefreshClick} onMouseEnter={handleRefreshHover} sx={{ color: "#adadad" }} />))}
      </section>
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
    </section>
  );
};

export default GraphsContainer;
