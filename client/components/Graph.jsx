import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Typography } from '@mui/material';

Chart.register(...registerables);

const Graph = ({
  title,
  cpuGraphMinutes,
  memoryGraphMinutes,
  setCpuGraphMinutes,
  setMemoryGraphMinutes,
  data,
}) => {
  const [graphDisplay, setGraphDisplay] = useState(null);
  const [graphTitleDisplay, setGraphTitleDisplay] = useState('');

  const chartRef = useRef(null);

  const handleSelectDisplay = (mins) => {

    if (title === 'CPU Usage') {
      setCpuGraphMinutes(mins);
    } else if (title === 'Memory Usage') {
      setMemoryGraphMinutes(mins);
    }
  };

  useEffect(() => {
    if (!data) {
      setGraphTitleDisplay('No Data Available');
      return;
    }

    const combinedData = data.map((item, index) => ({
      pod: item.metric.pod,
      usage: parseFloat(item.value[1]),
    }));
    const sortedData = combinedData.sort((a, b) => a.pod.localeCompare(b.pod));

    const labels = sortedData.map((item) => item.pod);
    const cpuUsages = sortedData.map((item) => item.usage);
    const barColors = cpuUsages.map((value) => {
      if (value >= 100) return 'rgba(222, 55, 27, 0.4)';
      else if (value >= 75) return 'rgba(216,190,31,0.4)';
      else return 'rgba(84,171,180,0.4)';
    });
    const borderColors = cpuUsages.map((value) => {
      if (value >= 100) return 'rgba(222, 55, 27, 1.0)';
      else if (value >= 75) return 'rgba(216,190,31,1.0)';
      else return 'rgba(84,171,180,1.0)';
    });

    if (graphDisplay) {
      graphDisplay.destroy();
    }

    const newGraphDisplay = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: cpuUsages,
            backgroundColor: barColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10,
              callback: function (value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const roundedValue = Math.round(context.raw);
                return `${context.dataset.label}: ${roundedValue}%`;
              },
            },
          },
        },
      },
    });

    setGraphDisplay(newGraphDisplay);
  }, [data, title]);

  return (
    <div id='innerGraphBox'>
      <h2 variant='h5'>{`Average ${title}`}</h2>
      <div className='sliderContainer'>
        <div className='tabs'>
          {[1440, 60, 10].map((mins) => (
            <div id='tab' key={mins}>
              <input
                className='radio'
                type='radio'
                id={`radio-${mins}-${title}`}
                name={`tabs-${title}`}
                checked={
                  (title === 'CPU Usage'
                    ? cpuGraphMinutes
                    : memoryGraphMinutes) === mins
                }
                onChange={() => handleSelectDisplay(mins)}
              />
              <label htmlFor={`radio-${mins}-${title}`} className='tab'>
                {mins === 1440
                  ? '24 Hours'
                  : mins === 60
                  ? '1 Hour'
                  : '10 Min'}
              </label>
            </div>
          ))}
        </div>
          <span
            className='graphSlider'
            style={{
              transform: `translateX(${
                (title === 'CPU Usage'
                  ? cpuGraphMinutes
                  : memoryGraphMinutes) === 1440
                  ? -150
                  : (title === 'CPU Usage'
                      ? cpuGraphMinutes
                      : memoryGraphMinutes) === 60
                  ? 0
                  : 150
              }%)`,
            }}
          ></span>
      </div>
      <Typography variant='subtitle1'>{graphTitleDisplay}</Typography>
      <canvas ref={chartRef} width='400' height='400'></canvas>
    </div>
  );
};

export default Graph;
