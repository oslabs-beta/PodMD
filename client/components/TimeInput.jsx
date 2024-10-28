import * as React from 'react';
import TimeToolTip from './ToolTip';

const TimeInput = React.forwardRef(function CustomNumberInput(
  { timeFrame, onTimeChange, ...props },
  ref
) {
  return (
    <div id='timeInputField'>
      <div id='timeInputLabel'>Refresh window (min)</div>
      <input
        id='timeInput'
        type='number'
        min='1'
        max='10000'
        value={timeFrame}
        onChange={(e) => onTimeChange(e.target.value)}
        aria-label='Refresh window in minutes'
      />
      <TimeToolTip id='timeTool' />
    </div>
  );
});

export default TimeInput;
