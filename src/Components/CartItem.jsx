import React, { useEffect, useState } from 'react'
import {Stack,Typography,Button,Box,Grid} from '@mui/material';
import useGlobalState from '../GlobalStates/useGlobalState';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import formatter from '../utils/currencyFormatter';

const CartItem = ({item,setTotalPrice}) => {
    const {cart,setCart,userID} = useGlobalState();
    const [quantity,setQuantity] = useState(item.quantity);
    const handleDelete = async () => {
        const newItems = cart.items.filter(eachItem => eachItem !== item);
        setCart({...cart,items: newItems});
        console.log("before backend: ",item._id)
        try{
            const {data: deleted} = await axios.put(`http://localhost:5000/api/delete-cartItem/${userID}`,{itemId: item._id})
            console.log(deleted);

        }catch(error){
            console.log(error)
        }
    }
    const handleCartUpdate = async (type) => {
        let newQuantity = quantity
        if(type === "increase"){
            if(quantity < item.product.quantity){
                newQuantity += 1;
            }
        }else{
            if(quantity > 1){
                newQuantity -= 1;
            }
        }
        setQuantity(newQuantity);
        const indexOfItem = cart.items.findIndex(order => order === item);
        console.log("The index is: ",indexOfItem);
        const newCart = {...cart};
        newCart.items[indexOfItem].quantity = newQuantity;
        setCart(newCart)
        console.log("The new cart is: ",newCart);
        const newTotal = newCart.items.reduce((accumulator,currentItem)=>{
            const eachCost = currentItem.product.price * currentItem.quantity;

            return accumulator + eachCost;
        },0);
        console.log("New total is: ",newTotal);
        setCart(newCart)
        setTotalPrice(newTotal)
        try{
            const {data: updated} = await axios.put(`http://localhost:5000/api/update-cart/${userID}`,{itemId: item._id, quantity: newQuantity})
            console.log(updated)
        }catch(error){
            console.log("oops error occured: ",error)
        }

    }

  return (
    <Stack direction="row" sx={{borderBottom: "1px solid gray",height: "150px",paddingY: "20px",position: "relative"}} >
        <img style={{height: "100%",width: "100px"}} src={item.product.src} alt={item.product.name} />
        <Stack gap={2} sx={{width: "100%",paddingLeft: "20px"}}>
            <Stack>
                <Typography sx={{fontSize: "15px"}}>{item.product.name}</Typography>
                <Typography sx={{fontSize: "12px",color: "gray"}}>Color: {item.color}</Typography>
                <Typography sx={{fontSize: "12px",color: "gray"}}>Size: {item.size}</Typography>
            </Stack>
            <Stack direction="row" sx={{justifyContent: "space-between",alignItems: "center",width: "100%"}}>
                <Stack direction="row" alignItems="center" justifyContent="center" width="70px" sx={{border: "1px solid gray"}}>
                    <Box sx={{width: "33%",height: "100%",display: "flex",justifyContent: "center",alignItems: "center",fontSize: "16px",cursor: "pointer"}} onClick={()=> handleCartUpdate("reduce")} >-</Box>
                    <Typography align="center" color="#3b3b3b" sx={{fontSize: "14px",width: "33%",height: "100%"}}>{item.quantity}</Typography>
                    <Box sx={{width: "33%",display: "flex",justifyContent: "center",alignItems: "center",fontSize: "16px",cursor: "pointer",height: "100%"}} onClick={()=> handleCartUpdate("increase")} >+</Box>                 
                </Stack>
                <Typography sx={{fontSize: "18px",color: "brown"}}>{formatter.format(item.product.price * quantity)}</Typography>
            </Stack>
        </Stack>
        <Box sx={{position: "absolute",top: "10px",right: 0,width: "30px",height: "30px", display: "flex", justifyContent: "center", alignItems: "center",borderRadius: "50%",cursor: "pointer" }} onClick={()=>handleDelete()}>
            <ClearIcon fontSize="small" />
        </Box>
    </Stack>
  )
}

export default CartItem;
