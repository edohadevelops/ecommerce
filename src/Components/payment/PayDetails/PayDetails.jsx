import React, { useEffect } from 'react';
import { Stack, Box ,Typography , Grid ,Button,Badge} from '@mui/material';
import Input from '../fields/Input';
import Delivery from '../fields/Devlivery';
import useGlobalState from '../../../GlobalStates/useGlobalState';
import axios from 'axios'
import formatter from '../../../utils/currencyFormatter';

const PayDetails = () => {
  const {cart,userID} = useGlobalState();

  const handlePay = async() => {
    const {data: initialize} = await axios.post(`http://localhost:5000/api/pay/initialize/${userID}`,{name: "Amen"});
    window.location.href = initialize.url

    console.log(initialize.url)
  }
  
  return (
    <Stack direction="row" gap={5}
    sx={{
        paddingY: "100px",
        paddingX: "100px",
        
    }}>
      <Stack gap={3} sx={{
        width: "50%"
      }}>
        <Stack gap={1}>
          <Typography>Contact</Typography>
          <Input title="Email" />
        </Stack>
        <Stack gap={1}>
          <Typography>Delivery</Typography>
          <Delivery />
        </Stack>
        <Grid container sx={{gap: "10px"}}>
          <Grid item xs={12}>
            <Input title="Country/Region" />
          </Grid>
          <Grid item xs={5}>
            <Input title="First Name" />
          </Grid>
          <Grid item xs={5}>
            <Input title="Last Name" />
          </Grid>
          <Grid item xs={12}>
            <Input title="Address" />
          </Grid>
          <Grid item xs={12}>
            <Input title="" placeholder="Apartment,suite, etc. (oprtional)" />
          </Grid>
          <Grid item xs={3}>
            <Input title="City"/>
          </Grid>
          <Grid item xs={3}>
            <Input title="State" />
          </Grid>
          <Grid item xs={3}>
            <Input title="Postal Code" />
          </Grid>
          <Grid item xs={12}>
            <Input title="Phone number for order updates" />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handlePay} sx={{fontSize: "18px",paddingY: "10px"}}>Pay Now</Button>
      </Stack>
      <Stack gap={2} sx={{
        width: "50%",
        bgcolor: "#eceeee",
        padding: "20px"
      }}>
        {
          cart?.items.map((item) => (
            <Stack direction="row" gap={2} sx={{alignItems: "center"}}>
              <Badge badgeContent={item.quantity} color='success' sx={{width: "fit-content"}}>
                <img style={{width: "60px",height: "70px"}} src={item.product.src} />
              </Badge>
              <Stack direction="row" sx={{alignItems: "center",justifyContent: "space-between",width: "100%"}}>
                <Stack>
                  <Typography sx={{fontSize: "14px",fontWeight: "600"}}>{item.product.name}</Typography>
                  <Typography sx={{fontSize: "13px"}}>{item.color} / {item.size}</Typography>
                </Stack>
                <Typography sx={{fontSize: "15px"}}>{formatter.format(item.product.price * item.quantity)}</Typography>
              </Stack>
            </Stack>

          ))
        }
      </Stack>

    </Stack>
  )
}

export default PayDetails
