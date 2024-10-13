import React, { useState,useContext } from 'react'
import {Link} from "react-router-dom"
import { Stack, Typography, Box,TextField,Button,Grid } from '@mui/material'
import Logo from '../assets/bolalogo.jpg'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/Store'
import axios from 'axios';
import HeroLogin from '../Components/HeroLogin'


const CreateAdmin = () => {
    const [products,setProducts,whoLoggedIn,setWhoLoggedIn,loginView,setLoginView,userID,setUserID] = useContext(Context)
    const [userData ,setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        position: "",
        password: ""
    })
    const [error,setError] = useState("")

    const handleChange = ({currentTarget: input}) => {
        setUserData({...userData,[input.name]: input.value})
    }

    const navigate = useNavigate();

    // const DB_URL = 'http://localhost:5000/'

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:5000/api/createSupAdmin";
            const {data: res} = await axios.post(url,userData);
            navigate('/shop')
            console.log(res.message)
        }catch(error){
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                setError(error.response.data.message);
                console.log(error)
            }
        }
    }
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
                    transition: "1s"
                }} 
                bgcolor='rgba(134, 199, 199, 0.2)'

            >
                <Stack direction="column" sx={{alignItems: "center"}}>
        <img src={Logo} alt="bola psd Logo" className="logo-signup" />
        <Typography variant="h3" fontSize="30px" fontWeight="700" align="center" marginTop="30px" marginBottom="50px">Create an account</Typography>
        <form onSubmit={handleSubmit}>
            <Stack direction="row" sx={{flexWrap: "wrap", gap: "20px",justifyContent: "center"}}>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="firstname">First Name</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="firstName" value={userData.firstName} onChange={handleChange}/>
                </Box>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="username">Last Name</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="lastName" value={userData.lastName} onChange={handleChange}/>
                </Box>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="email">Email address</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="email" value={userData.email} onChange={handleChange} />
                </Box>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="email">Username</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="username" value={userData.username} onChange={handleChange} />
                </Box>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="position">Position</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="position" value={userData.position} onChange={handleChange} />
                </Box>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="password">Password</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="password" value={userData.password} onChange={handleChange} />
                </Box>
                <Button variant='contained' display='block' sx={{marginTop:'20px',backgroundColor: '#145555', width: '70%'}} type="submit">Sign up</Button>
                <Typography align='center' sx={{
                    width: "100%"
                }}>or</Typography>
                <Stack>
                    <Typography>Already have an account? <Link to='/' style={{color: '#145555'}}>Log in</Link></Typography>
                </Stack>
            </Stack>
        </form>
    </Stack>
            </Grid>
        </Grid>
    
  )
}

export default CreateAdmin;
