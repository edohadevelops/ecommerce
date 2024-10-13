import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Badge, Box } from '@mui/material';
import Logo from '../assets/bolalogo.jpg';
import profileImage from '../assets/profile.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StarIcon from '@mui/icons-material/Star';
import useGlobalState from '../GlobalStates/useGlobalState';



const Navbar = ({fullname,type}) => {
    const {cart,setCartModal,favouriteItems} = useGlobalState();

  return (
    <AppBar sx={{backgroundColor: "#187070"}}>
        <Toolbar sx={{justifyContent: "space-between"}}>
            <Stack direction='row' sx={{height: "100%", alignItems: "center"}}>
                <img src={Logo} alt="bolapsd logo" className='navbar-logo'/>
                <Typography variant='h1' sx={{fontSize: {xs: '20px', sm: '25px'}}} fontWeight='900' ml='15px'>BOLAPSD</Typography>
                <MenuIcon sx={{marginLeft: {xs: "20px"}}}/>
            </Stack>
            <Stack direction="row" spacing={4} sx={{alignItems: "center"}}>
                <Badge sx={{cursor: "pointer"}} onClick={()=> setCartModal("favourite")} badgeContent={favouriteItems?.length} max={9} color="error">
                    <StarIcon />
                </Badge>
                <Badge sx={{cursor: "pointer"}} badgeContent={cart?.items?.length} onClick={()=> setCartModal("shop")} max={9} color="error">
                    <LocalMallIcon  />
                </Badge>
                <Box sx={{display: "flex"}} alignItems="center">
                    <img className='nav-profile-pic' src={profileImage} alt="profile photo" />
                    <Typography sx={{marginLeft: "10px"}}>{fullname}</Typography>
                    <KeyboardArrowDownIcon />
                </Box>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
