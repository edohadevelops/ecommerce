import React, {useEffect, useState} from 'react';
import { Box } from '@mui/material';
import Navbar from '../Components/Navbar'
import HeroComponent from '../Components/HeroComponent'
import axios from 'axios';
import useGlobalState from '../GlobalStates/useGlobalState';

const AdminDashboard = () => {
  const DB_URL = 'http://localhost:5000'

  const {products,setProducts,setCategories} = useGlobalState()

  const [userData, setUserData] = useState({})

  useEffect(()=> {
    const get = async() => {
      try{
        const {data: productsData} = await axios.get(`${DB_URL}/api/getProducts`);
        const {data: categories} = await axios.get(`http://localhost:5000/api/get-categories`);
        console.log(productsData.message);
        console.log(categories.message);
        setProducts(productsData.data)
        setCategories(categories.categories)
      }
      catch(err){
        console.log(err)
      }
    }
    // getUserDetails()
    get()
  },[])

  console.log(userData)
  return (
    <Box sx={{position: "relative"}}>
        <Navbar fullname={userData?.fullname}/>
        <HeroComponent fullname={userData?.fullname} firstname={userData?.firstname} position={userData?.position} products={products} />
    </Box>
  )
}

export default AdminDashboard
