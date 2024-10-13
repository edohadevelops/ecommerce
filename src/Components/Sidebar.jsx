import React from 'react';
import { Box, Badge,Typography } from '@mui/material';
import profileImage from '../assets/profile.jpg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SidebarLink from './SidebarLink';
import Logout from './Logout';

const Sidebar = ({fullname,position,setView}) => {
  return (
    <Box width='15%' bgcolor="#eceeee" position="relative">
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}} paddingTop="30px" bgcolor="#187070">
            <img src={profileImage} alt="logo" className="sidebar-profile-image" />
            <Typography color="#fff" mt={2}>{fullname}</Typography>
            <Typography color="#ececec" fontSize={13} fontWeight="lighter" >{position}</Typography>
            <Box sx={{display: "flex", width: "100%"}} mt={3}>
                <Box sx={{flex: "1", display: "flex",justifyContent: "center",alignItems: "center", height: "50px", border: "solid 1px #959696", borderLeft: "0"}}>
                    <Badge color="error" variant="dot">
                        <NotificationsIcon sx={{color: "white"}} fontSize="small"/>
                    </Badge>
                </Box>
                <Box sx={{flex: "1", display: "flex",justifyContent: "center",alignItems: "center", height: "50px", border: "solid 1px #959696"}}>
                    <SettingsIcon sx={{color: "white"}} fontSize="small"/>
                </Box>
                <Box sx={{flex: "1", display: "flex",justifyContent: "center",alignItems: "center", height: "50px", border: "solid 1px #959696", borderRight: "0"}}>
                    <ChatBubbleOutlineIcon sx={{color: "white"}} fontSize="small"/> 
                </Box>
            </Box>
        </Box>
        <Box paddingTop="10px">
            <SidebarLink link="Dashboard" setView={setView}/>
            <SidebarLink link="Products" setView={setView} />
            <SidebarLink link="Category" setView={setView} />
        </Box>
        <Logout />
    </Box>
  )
}

export default Sidebar
