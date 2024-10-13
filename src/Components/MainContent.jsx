import React from 'react';
import {Box,Stack,Typography} from '@mui/material';
import Dashboard from './Dashboard';

const MainContent = ({firstname}) => {
  return (
    <>
      <Dashboard firstname={firstname} />
    </>
  )
}

export default MainContent
