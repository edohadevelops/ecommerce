import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'

const Input = ({title,placeholder}) => {
    const [active,setActive] = useState(false);

  return (
    <Stack onClick={()=>setActive(!active)} sx={{
        width: "100%",
        border: active ? "2px solid #187070" : "2px solid gray",
        padding: "5px",
        borderRadius: "5px",
        cursor: "text",
        transition: "1s",
        minHeight: "40px"
    }}>
        <Typography fontSize="13px" color="#3b3b3b">{title}</Typography>
        <input placeholder={placeholder} style={{
            border: 0,
            outline: "none",
            
        }}  />
    </Stack>
  )
}

export default Input;
