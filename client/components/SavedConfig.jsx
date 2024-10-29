import React from 'react';

const SavedConfig = ({ savedConfiguration }) => {
  const { savedMemoryThreshold, savedMemTimeFrame, savedCpuThreshold, savedCpuTimeFrame } = savedConfiguration;

  return (
    <><h2>
      Current saved configuration
    </h2>
      <list>
        <li>Max memory usage: {savedMemoryThreshold}</li>
        <li>Time frame: {savedMemTimeFrame}</li>
        <li>Max CPU usage: {savedCpuThreshold}</li>
        <li>Time frame: {savedCpuTimeFrame}</li>
      </list></>
  );
};

export default SavedConfig;