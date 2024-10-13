import React,{useContext} from 'react';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Context } from '../store/Store';
import useGlobalState from '../GlobalStates/useGlobalState';


const Logout = () => {
    const [products,setProducts,whoLoggedIn,setWhoLoggedIn,loginView,setLoginView,userID,setUserID] = useContext(Context);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setWhoLoggedIn(false)
        navigate("/")
    }

  return (
    <Button variant='contained' sx={{backgroundColor: "white",color: "black",position: "absolute",bottom: "100px"}} onClick={handleLogout}>Logout</Button>
  )
}

export default Logout
