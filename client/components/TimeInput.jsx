import * as React from 'react';

const TimeInput = React.forwardRef(function CustomNumberInput(
  { timeFrame, onTimeChange, ...props },
  ref
) {
  return (
    <div id='timeInputField'>
      <h3 id='timeInputLabel'>Refresh window (min)</h3>
      <input
        id='timeInput'
        type='number'
        min='1'
        max='10000'
        value={timeFrame}
        onChange={(e) => onTimeChange(e.target.value)}
        aria-label='Refresh window in minutes'
      />
    </div>
  );
});

export default TimeInput;
