import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#363637',
  color: '#adadad',
  fontFamily: 'Aldrich',
  padding: '10px',
  border: 'none',
  marginBottom: '20px'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#363637',
  color: '#adadad',
  fontFamily: 'Aldrich',
  padding: 0,
  border: 'none',
  marginBottom: '10px'
}));

const SavedConfig = ({ savedConfiguration }) => {
  const { savedMemoryThreshold, savedMemTimeFrame, savedCpuThreshold, savedCpuTimeFrame, savedSettings } = savedConfiguration;
  
  function createData(resource, threshold, time) {
    return { resource, threshold, time };
  }
  
  const rows = [
    createData('Memory', `${savedMemoryThreshold}%`, `${savedMemTimeFrame} min`),
    createData('CPU', `${savedCpuThreshold}%`, `${savedCpuTimeFrame} min`),
  ];

  return (
    <>
    <h2>
      Current Saved Settings
    </h2>
    <TableContainer 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '5px',
      }}
      >
    <Table sx={{ maxWidth: 400, borderSpacing: 10 }} aria-label="simple table">
      <TableHead sx={{ fontSize: '20px', color: '#adadad', marginBottom: '20px' }}>
        <StyledTableRow align='center' sx={{ fontSize: '20px', color: '#adadad', marginBottom: '20px' }}>
            <StyledTableCell align='center' sx={{ fontSize: '20px', color: '#adadad', marginBottom: '20px' }}>Resource</StyledTableCell>
            <StyledTableCell align='center' sx={{ fontSize: '20px', color: '#adadad', marginBottom: '20px' }}>Threshold</StyledTableCell>
            <StyledTableCell align='center' sx={{ fontSize: '20px', color: '#adadad', marginBottom: '20px' }}>Time Frame</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              sx= {{ color: '#adadad', backgroundColor: '#242424'}}
              align='center'
              key={row.resource}
            >
              <StyledTableCell sx={{ fontSize: '16px', color: '#adadad' }} align='center' component='th' scope='row'>
                {row.resource}
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: '16px', color: '#adadad' }} align='center'>{row.threshold}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: '16px', color: '#adadad' }} align='center'>{row.time}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default SavedConfig;