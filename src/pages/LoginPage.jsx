import React,{ useContext } from 'react';
import { Grid } from '@mui/material'
import HeroLogin from '../Components/HeroLogin';
import LoginView from '../Components/LoginView';
import CreateView from '../Components/CreateView';
import useGlobalState from '../GlobalStates/useGlobalState';


const LoginPage = () => {
    const {loginView} = useGlobalState()
    
    return (
        
        <Grid container height='100%' >
            <Grid item xs={loginView === "login"? 7 : 6} className='hero-login' 
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: {sm: 'flex', xs: 'none'},
                    transition: "1s"
                }}
                direction='column'
            >
                <HeroLogin />
            </Grid>
            <Grid item
                xs={12} sm={loginView === "login"? 5 : 6} 
                display='flex' 
                direction='column'
                sx={{
                    justifyContent: 'center',
                    alignItems: "center",
                    paddingX: {xs: '50px',sm: '70px',md: '100px'},
                    transition: "1s",
                    position: "relative"
                }} 
                bgcolor='rgba(134, 199, 199, 0.2)'
            

            >
                {loginView === "login"? <LoginView /> : <CreateView />}
            </Grid>
        </Grid>
    )
}

export default LoginPage;