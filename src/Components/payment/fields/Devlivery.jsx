import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Delivery = () => {
    const [active,setActive] = useState(false);

  return (
    <Stack 
        direction="row" 
        onClick={()=>setActive(!active)} 
        sx={{
            width: "100%",
            border: "2px solid #187070",
            padding: "15px",
            borderRadius: "5px",
            cursor: "text",
            transition: "1s",
            justifyContent: "space-between",
        }}
    >
        <Stack direction="row" gap={1}>
            <Stack 
                sx={{
                    borderRadius: "50%",
                    boxShadow: "1px 1px 1px gray",
                    height: "15px",
                    width: "15px",
                    bgcolor: active ? "#f5f5f5" : "#187070",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Stack sx={{height: "7px",width: "7px",borderRadius: "50%",bgcolor: "#fff"}}></Stack>
            </Stack>
            <Typography>Ship</Typography>
        </Stack>
        <LocalShippingIcon fontSize="small" color="#187070" />

    </Stack>
  )
}

export default Delivery;
