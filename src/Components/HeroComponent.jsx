import React,{useState,useEffect} from 'react';
import { Stack, Box} from '@mui/material';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AdminProducts from './AdminProducts';
import Categories from './Categories';



const HeroComponent = ({fullname,firstname,position,products}) => {
  const [view,setView] = useState("Dashboard");

  useEffect(()=>{
    console.log(view)
  },[view])

  return (
    <Stack direction="row" marginTop="50px" sx={{width: '100vw',minHeight: '100vh'}}>
        <Sidebar fullname={fullname} position={position} setView={setView}/>
        <Box paddingX="2%" paddingY="30px" sx={{width: "85%"}}>
            {
              view === "Dashboard" ?
              <MainContent firstname={firstname}/> 
              : view === "Products" ? 
              <AdminProducts productType={view} products={products} /> : 
              <Categories />
            }
            {/* <CreateProducts /> */}
        </Box>
    </Stack>
  )
}

export default HeroComponent
