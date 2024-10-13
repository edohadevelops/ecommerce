import React,{useEffect,} from 'react'
import { useNavigate } from 'react-router-dom'


const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/")
    }
  },[])
  return (
    <div>
        <p>Admin Page has to be logged in first</p>
    </div>
  )
}

export default ErrorPage
