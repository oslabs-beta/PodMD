import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RestartedPodRow from './RestartedPodRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const RestartedPodTable = ({ restartedPods }) => {
  const rows = [];
  restartedPods.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0));
  for (let i = 0; i < Math.min(restartedPods.length, 10); i++) {
    let { timestamp, podName, namespace, label, value, threshold } = restartedPods[i];
    rows.push(<RestartedPodRow key={`${timestamp} ${podName}`} timestamp={new Date(timestamp)} podName={podName} namespace={namespace} label={label} value={value} threshold={threshold} />);
  }
  return (
      <>
    <TableContainer className='tabContain' sx={{backgroundColor: '#242424' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead id='tblhd'>
          <StyledTableRow id='str'>
              <StyledTableCell id='firstHeader' className='tableHeader'>Restarted Pod</StyledTableCell>
              <StyledTableCell className='tableHeader'>Time Deleted</StyledTableCell>
              <StyledTableCell className='tableHeader'>Namespace</StyledTableCell>
              <StyledTableCell className='tableHeader'>Metric</StyledTableCell>
              <StyledTableCell className='tableHeader'>Restart</StyledTableCell>
              <StyledTableCell className='tableHeader'>Threshold</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default RestartedPodTable;