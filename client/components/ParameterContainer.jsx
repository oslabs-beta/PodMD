import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Parameters from './Parameter';
import SavedConfig from './SavedConfig';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const ParameterContainer = ({
  handleSubmit,
  memory,
  setMemory,
  memTimeFrame,
  setMemTimeFrame,
  cpu,
  setCpu,
  cpuTimeFrame,
  setCpuTimeFrame,
  savedConfiguration,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSaveAndSubmit = () => {
    handleSubmit();
    setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <div id='outerBox'>
        <Box id='paramBox'>
          <div id='test'>
          <Parameters
            metric='Memory'
            value={memory}
            onChange={setMemory}
            timeFrame={memTimeFrame}
            onTimeChange={setMemTimeFrame}
          />
          <Parameters
            metric='CPU'
            value={cpu}
            onChange={setCpu}
            timeFrame={cpuTimeFrame}
            onTimeChange={setCpuTimeFrame}
          />
          </div>
            <Box id='configButton'>
              <Button
                sx={{
                  color: '#242424',
                  backgroundColor: '#54abb4',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#54abb4',
                  },
                }}
                variant='contained'
                id='saveButton'
                onClick={handleSaveAndSubmit}
                endIcon={<DataSaverOnIcon />}>
                Save
              </Button>
            </Box>
        </Box>
        <Box id='settingsCard'>
          <SavedConfig savedConfiguration={savedConfiguration} />
          <Collapse in={showAlert}>
            <Alert severity="success" sx={{ width: '225px', backgroundColor: '#54abb4', color: '#242424', borderRadius: '4px', marginTop: 2 }}>
              Settings successfully saved.
            </Alert>
          </Collapse>
        </Box>
      </div>
    </>
  );
};

export default ParameterContainer;
