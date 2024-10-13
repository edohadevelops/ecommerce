import React from 'react'
import { Box, Stack, Typography, } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DashboardCards from './DashboardCards';


const Dashboard = ({firstname}) => {
  return (
    <Box bgcolor="#eceeee" padding="20px">
        <Typography fontSize="20px" color="#062f3b">Good morning {firstname}!</Typography>
        <Typography fontSize="12px" color="#062f3b">Dashboard</Typography>
        <Box sx={{display: "flex", gap: "30px"}} marginTop="40px">
            <DashboardCards />
        </Box>
    </Box>
  )
}

export default Dashboard
