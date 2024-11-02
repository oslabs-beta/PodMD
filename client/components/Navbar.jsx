import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logo.png';
import logoName from '../assets/logoName.png';
import slogan from '../assets/slogan.png';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ backgroundColor: '#242424' }}>
        <Toolbar
          id='toolbar'
          sx={{
            backgroundColor: '#242424',
            borderRadius: '8px',
          }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt='PodMD Logo'
              className='logo heartbeat'
              style={{
                width: '65px',
                height: 'auto',
                margin: '0.5rem 0.5rem',
                transition: 'filter 0.3s',
                filter: 'grayscale(10%)',
              }}
            />
            <img
              src={logoName}
              alt='PodMD'
              className='logoName'
              style={{
                width: '100px',
                height: 'auto',
                marginBottom: '0',
                transition: 'filter 0.3s',
                filter: 'grayscale(10%)',
              }}
            />
          </div>
          <img
            src={slogan}
            alt='PodMD - Cluster Monitoring for Developers'
            width='250px'
            height='auto'
          />
        </Toolbar>
      </AppBar>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .logo:hover {
          animation: pulse 0.6s infinite;
          filter: grayscale(0%);
        }
      `}</style>
      <Box sx={{ marginTop: '64px' }}></Box>
    </Box>
  );
}

export default Navbar;
