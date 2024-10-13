import React from 'react'
import {useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import ErrorPage from './ErrorPage'
import UserDashboard from './UserDashboard';
import axios from 'axios';
import useGlobalState from '../GlobalStates/useGlobalState';


const AfterLogin = () => {
    const {whoLoggedIn,setWhoLoggedIn,setUserID} =  useGlobalState();

    useEffect(()=>{
        const getDetails = async() =>{
          const token = localStorage.getItem("token")
          try{
            const adminURL = "http://localhost:5000/api/getAdminData";
            const {data: admin} = await axios.get(adminURL,{
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
            console.log(admin.data);
            setWhoLoggedIn("admin");
          }catch(adminError){
            try{
              const userURL = "http://localhost:5000/api/getUserData";
              const {data: user} = await axios.get(userURL,{
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
              setUserID(user.user._id)
              setWhoLoggedIn("user");
            }catch(userError){
              console.log("Invalid Token")
            }
          }
          
        }
        getDetails();
    },[])


  return (
    <div>
        { whoLoggedIn === "admin" ?
          (<AdminDashboard />) :
          whoLoggedIn === "user" ?
          (<UserDashboard />):
          (<ErrorPage />)
        }
    </div>
  )
    // {adminLoggedIn?
    //     (
    //         <div>
    //         </div>
    //     ):
    //     (
    //     )
    // }
    
}

export default AfterLogin;
