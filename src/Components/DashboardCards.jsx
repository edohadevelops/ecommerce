import React from 'react'
import { Box, Stack, Typography, } from '@mui/material';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WalletIcon from '@mui/icons-material/Wallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const DashboardCards = () => {
  return (
    <>
        <Stack direction="row" sx={{flex: "1",alignItems: "center",background: "linear-gradient(to right, rgb(240, 13, 51) 40% , pink 100%)"}} color="#eceeee" spacing={5} padding="15px">
                <LocalGroceryStoreOutlinedIcon sx={{fontSize: "40px"}} />
                <Box>
                    <Typography>Products</Typography>
                    <Typography>+ 21</Typography>
                </Box>
            </Stack>
            <Stack direction="row" sx={{flex: "1",alignItems: "center",background: "linear-gradient(129deg, rgb(20, 20, 247) 30% , rgb(183, 183, 235))"}} color="#eceeee" spacing={5} padding="15px">
                <PeopleOutlineIcon sx={{fontSize: "40px"}} />
                <Box>
                    <Typography>New users</Typography>
                    <Typography sx={{display: "flex", alignItems: "center", fontSize:"14px"}}><ArrowUpwardIcon fontSize="14px" /> 1,2830</Typography>
                </Box>
            </Stack>
            <Stack direction="row" sx={{flex: "1",alignItems: "center",background: "linear-gradient(60deg, rgb(1, 156, 71) 30% , rgb(106, 252, 196))"}} color="#eceeee" spacing={5} padding="15px">
                <LocalShippingIcon sx={{fontSize: "40px"}} />
                <Box>
                    <Typography>New Orders</Typography>
                    <Typography sx={{display: "flex", alignItems: "center", fontSize:"14px"}}><ArrowDownwardIcon fontSize="14px"/> 48</Typography>
                </Box>
            </Stack>
            <Stack direction="row" sx={{flex: "1",alignItems: "center",background: "linear-gradient(to right, rgb(255, 123, 0) 40% , rgb(255, 223, 144))"}} color="#eceeee" spacing={5} padding="15px">
                <WalletIcon sx={{fontSize: "40px"}} />
                <Box>
                    <Typography>Total Profit</Typography>
                    <Typography sx={{display: "flex", alignItems: "center", fontSize:"14px"}}><ArrowUpwardIcon fontSize="14px"/> 5.6 M</Typography>
                </Box>
            </Stack>
    </>
  )
}

export default DashboardCards
