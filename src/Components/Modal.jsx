import React, { useState } from 'react'
import {Stack,Typography,Button} from '@mui/material'
import CreateProducts from './CreateProducts'
import DeleteProduct from './DeleteProduct'
import CreateCategory from './CreateCategory'

const Modal = ({type,modalStatus,setModalStatus}) => {
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
        paddingY: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        zIndex: 10000,
        overflow: "auto"
     }}>
        {
          (type === "update" || type === "create") ?
          <CreateProducts type={type} id={modalStatus.id} setModalStatus={setModalStatus}/> :
          type === "delete" ? 
          <DeleteProduct id={modalStatus.id} setModalStatus={setModalStatus} /> :
          (type === "newCategory" || type === "updateCategory" || type === "deleteCategory") ? 
          <CreateCategory type={type} id={modalStatus.id} setModalStatus={setModalStatus} /> :
          ""
        }
    </Stack>
  )
}

export default Modal
