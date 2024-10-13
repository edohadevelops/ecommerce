import React from 'react'
import { Stack,Typography,Button } from '@mui/material'

const FavouriteItem = ({item}) => {
  return (
    <Stack direction="row" sx={{height: "150px",gap: "10px"}}>
        <Stack sx={{height: "100%",width: "35%"}}>
            <img src={item.src} alt={item.name} style={{width: "100%",height: "100%"}} />
        </Stack>
        <Stack sx={{width: "65%"}}>
            <Typography sx={{fontSize: "16px"}}>{item.name}</Typography>
            <Typography sx={{fontSize: "14px",color: "gray"}}>{item.colors[0]}</Typography>
            <Typography>{item.price} NGN</Typography>
            <Stack sx={{cursor: "pointer",direction: "row",justifyContent: "center",alignItems: "center",height: "40px",width: "100px",borderRadius: "5px", bgcolor: "#187070", color: "#fff"}}>Add to Cart</Stack>

        </Stack>
    </Stack>
  )
}

export default FavouriteItem
