import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Typography, Button, TextField } from '@mui/material'
import { useContext,useState } from 'react';
import { Context } from '../store/Store';
import useGlobalState from '../GlobalStates/useGlobalState';
import axios from 'axios';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LoginView = () => {
    const navigate = useNavigate();

    const {setLoginView} = useGlobalState()

    const [userData ,setUserData] = useState({
        email: "",
        password: ""
    })
    const [message,setMessage] = useState(null)

    const handleChange = ({currentTarget: input}) => {
        setUserData({...userData,[input.name]: input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:5000/api/auth";
            const {data: res} = await axios.post(url,userData);
            localStorage.setItem("token", res?.data);
            toast(res.message,"success");
            const role = res?.role;
            role === "admin" ? window.location.href = "/dashboard" : role === "user" ? window.location.href = "/shop": window.location.href = "/dashboard";
        }catch(err){
            toast(err.response.data.message,"failure")
        }

    }
    const handleView = () => {
        setLoginView("create")
    }
    const toast = (details,type) =>{
        setMessage({
            details,
            type
        })
        setTimeout(()=>{
            setMessage(null)
        },3000)
    }

  return (
    <>
        <Stack direction="row" spacing={1} sx={{height: "40px",alignItems: "center",borderRadius: "30px",position: "absolute",top: message ? "40px" : "-40px",transition: "0.5s",bgcolor: message?.type === "success" ? "#b3fcb3" : "#fccaca"}} paddingX="10px">
            {message?.type === "success" ? <CheckCircleIcon sx={{color: "#108641"}} /> : message?.type === "failure" ? <ErrorIcon sx={{color: "#b11a1a"}} /> : ""}
            <Typography color="#636363">{message?.details}</Typography>
        </Stack>
      <Typography 
        variant='h1' 
        fontSize='40px' fontWeight='900' 
        align='center' 
        sx={{
            marginBottom: {xs: '20px',sm: '50px'}
        }}
    >
        BOLAPSD
    </Typography>
    
    <form className='input-form' onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Username or Email Address</label>
            <TextField sx={{height: '40px', width: '100%',marginTop: "10px"}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="email" value={userData.email} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <TextField type='password' sx={{height: '40px', width: '100%',marginTop: "10px"}} InputProps={{style: {height: '100%',backgroundColor: 'white'}}} bgcolor='#fff' name="password" value={userData.password} onChange={handleChange}/>
        </div>
                    
        <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
            <Link to='/' style={{color: '#145555'}}>Forgot password?</Link>
        </div>
        <Button variant='contained' type="submit" display='block' sx={{marginTop:'20px',backgroundColor: '#145555', width: '100%'}}>Log in</Button>
        <Typography align='center' sx={{
            marginY: '20px'
        }}>or</Typography>
        <Stack>
                        
            <Typography>Are you new? <Link to='/' onClick={handleView} style={{color: '#145555'}}>Create an account</Link></Typography>
        </Stack>
    </form>
    </>
  )
}

export default LoginView
