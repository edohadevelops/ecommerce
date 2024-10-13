import React from 'react';
import {Box,Typography,Button} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SidebarLink = ({link,setView}) => {
  const handleClick = ()=>{
    setView(link);
  }
  return (
    <Box sx={{
       display: "flex",
       paddingY: "10px", 
       paddingX: "5px", 
       marginBottom: "10px", 
       justifyContent: "space-between", 
       borderTopRightRadius: "30px", 
       borderBottomRightRadius: "30px",
       cursor: "pointer",
       width: "90%",
       color: "#062f3b",       
      }} 
       className="active" 
       onClick={handleClick}>

        <Typography sx={{display: "flex", gap: "5px"}}>
            <HomeOutlinedIcon />
            <Typography>{link}</Typography>
        </Typography>
        <KeyboardArrowDownIcon />
    </Box>
  )
}

export default SidebarLink
