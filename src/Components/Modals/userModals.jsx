import React, { useState } from 'react'
import {Stack,Typography,Button} from '@mui/material';
import ViewProducts from '../viewProducts';


const UserModal = ({type,modalStatus,setModalStatus}) => {
    console.log(modalStatus)
  const handleModal = (e) => {
    if(e.target === e.currentTarget){
      setModalStatus({
        status: false,
        type
      })
    }
  }

  return (
    <Stack 
     direction="row"
     onClick={handleModal}
     sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
        overflow: "auto"
     }}>
        
        {
          type === "viewProduct" ?
          <ViewProducts id={modalStatus.id} setModalStatus={setModalStatus}/> :
          ""
        }
    </Stack>
  )
}

export default UserModal
