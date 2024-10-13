import React, { useState,useContext } from 'react'
import {Link} from "react-router-dom"
import { Stack, Typography, Box,TextField,Button } from '@mui/material'
import Logo from '../assets/bolalogo.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CreateView = () => {
    const [userData ,setUserData] = useState({
        firstName: "",
        userName: "",
        email: "",
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
            const url = "http://localhost:5000/api/users";
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

    // const handleCreate = async() => {
        // const users = await fetchData(`${DB_URL}users`,{
        //     method: "GET",
        //     headers: {
        //         "Content-type": "application/json"
        //     }
        // })
        // if(username && emailAddress){
        //     const alreadyExists = users.find((user) => user.username === username || user.emailAddress === emailAddress)
        //     if(!alreadyExists){
        //         await fetchData(`${DB_URL}users`,{
        //             method: "POST",
        //             headers: {
        //                 "Content-type": "application/json"
        //             },
        //             body: JSON.stringify(userData)
        //         })
        //         sessionStorage.setItem("token", "jwt_user")
        //         setUserID = userData.id
        //         navigate('/shop')
        //     }else{
        //         console.log("user Already Exists")
        //     }
        // }
    // }

  return (
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
                    <label htmlFor="username">Username</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="userName" value={userData.userName} onChange={handleChange}/>
                </Box>
                <Box className="form-box" sx={{width: {sm: "220px"}}}>
                    <label htmlFor="email">Email address</label>
                    <TextField sx={{height: '40px', width: '100%'}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="email" value={userData.email} onChange={handleChange} />
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
  )
}

export default CreateView
