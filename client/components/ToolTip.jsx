import React from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const timeDescription = `
Choose what time frame to record average resource usage.
E.g., 30 min will record average memory or CPU usage of pods over the past 30 minutes.
`;

export default function TimeToolTip() {
  return (
    <Tooltip title={timeDescription}>
      <IconButton>
        <QuestionMarkIcon sx={{ color: '#242424', fontSize: 'small', backgroundColor: '#adadad', stroke: 'none', borderRadius: 5, padding: .2 }} />
      </IconButton>
    </Tooltip>
  );
}

//   const newDescription = `
//   Enter new description for PodMD component tooltip here.
//   `;

// export default function NewToolTip() {
//   return (
//     <Tooltip title={newDescription}>
//       <IconButton>
//         <QuestionMarkIcon />
//       </IconButton>
//     </Tooltip>
//   );
// }