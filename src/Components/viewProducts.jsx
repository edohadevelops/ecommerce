import React, { useState,useEffect } from 'react';
import { Box,Stack, Typography,Rating, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useGlobalState from '../GlobalStates/useGlobalState';
import axios from 'axios';

const ViewProducts = ({id}) => {

    const {products,cart,setCart,userID,setCartModal} = useGlobalState();
    const [currentProduct,setCurrentProduct] = useState({}) 
    const [selectedSize,setSelectedSize] = useState("");
    const [selectedColor,setSelectedColor] = useState("any");
    const [percentage,setPercentage] = useState("100%");
    const [quantity,setQuantity] = useState(1);

    useEffect(()=>{
        const current = products.find((product) => product._id === id);
        setCurrentProduct(current);
        setSelectedSize(current?.sizes[0])
        setSelectedColor(current?.colors[0]);
        console.log(current);

        setTimeout(()=>{
            const percent = Math.round(current.quantity / 100  * 100);
            setPercentage(`${percent}%`)

        },2000)
    },[]);

    
    const rating = 3;
    const handleQuantity = (sign) => {
        setQuantity((prev)=>{
            if(sign === "+"){
                if(quantity < currentProduct.quantity){
                    return prev + 1;
                }
                return prev;
            }else{
                if(quantity > 1){
                    return prev - 1
                }
                return prev;
            }
        })
    }

    const handleCart = async(product) => {
        const order = {
            product,
            size: selectedSize,
            color: selectedColor,
            quantity,
        }
        const orderPrice = order.product.price * quantity;
        const newTotal = cart.totalPrice + orderPrice
        const updatedCart = {...cart,items: [...cart.items,order],totalPrice: newTotal};
        setCart(updatedCart);
        setCartModal("shop")
        try{
            const {data} = await axios.put(`http://localhost:5000/api/add-cartItem/${userID}`,{newItem: {...order,product: product._id}});
            console.log("Data is:",data)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <Stack direction="row" sx={{height: "550px",width: "90%",bgcolor: "white"}} >
        <Stack sx={{width: "50%",height: "100%"}}>
            <img style={{height: "100%",width: "100%"}} src={currentProduct?.src} alt={currentProduct.name}/>

        </Stack>
        <Stack className="scroll-me" sx={{width: "50%",height: "100%",padding: "50px",overflowY: "scroll"}} bgcolor="#eceeee">
            <Typography variant="h5" sx={{marginBottom: "10px",color: "#187070",textTransform: "uppercase"}} >{currentProduct?.name}</Typography>
            <Rating value={rating} precision={0.5} size="small" sx={{marginBottom: "20px"}} readOnly/>

            <Typography variant="h6" sx={{color: "brown",marginBottom: "5px",fontSize: "25px"}}>&#8358; {currentProduct?.price}</Typography>
            <small style={{marginBottom: "20px",color: "#3b3b3b"}}>Tax included. Shipping calculated at checkout.</small>

            <Stack direction="row" sx={{justifyContent: "space-between",alignItems: "center",padding: "10px",borderTop: "1px solid gray",borderBottom: "1px solid gray",cursor: "pointer"}}>
                <span style={{textTransform: "uppercase",fontSize: "13px",letterSpacing: "2px",color: "#3b3b3b"}}>View Full Details</span>
                <KeyboardArrowRightIcon />
            </Stack>
            <Stack paddingY="15px" gap={1}>
                <Typography fontSize="14px" textTransform="uppercase" color="#3b3b3b">Size</Typography>
                <Stack direction="row" sx={{gap: "10px"}}>
                    {
                        currentProduct?.sizes?.map(size => (
                            <Button size='small' variant="contained" sx={{
                                bgcolor: selectedSize === size ? "#187070" : "#fff",
                                color: selectedSize === size ? "#fff" : "#3b3b3b"
                            }}
                            onClick={()=>setSelectedSize(size)}>{size}</Button>
                        ))
                    }
                </Stack>
            </Stack>
            <Stack gap={1}>
                <Typography fontSize="14px" textTransform="uppercase" color="#3b3b3b">Color - {selectedColor && selectedColor}</Typography>
                <Stack direction="row" sx={{gap: "10px"}}>
                    {
                        currentProduct?.colors?.map(color => (
                            <Box sx={{
                                bgcolor: color,
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                border: selectedColor === color && "2px dashed",
                                borderColor: color.toLowerCase() === "black" ? "white" : "black",
                                cursor: "pointer"
                            }}
                            onClick={()=>setSelectedColor(color)}></Box>
                        ))
                    }
                </Stack>
            </Stack>
            <Stack gap={1} sx={{paddingY: "15px"}}>
                <Typography sx={{color: "#3b3b3b",wordSpacing: "5px",fontSize: "14px"}} textTransform="uppercase">Hurry, only <span style={{fontWeight: "bolder"}}>{currentProduct.quantity}</span> items left in Store!</Typography>
                <Stack sx={{height: "4px",backgroundColor: "#c9c7c7"}}>
                    <Stack sx={{height: "100%",backgroundColor: "#187070",width: percentage,transition: "2s ease"}}></Stack>
                </Stack>
            </Stack>
            <Stack direction="row">
                <Stack direction="row" alignItems="center" width="30%" gap={2}>
                    <Box sx={{width: "35px",height: "35px",display: "flex",justifyContent: "center",alignItems: "center",fontSize: "20px",cursor: "pointer",borderRadius: "50%",backgroundColor: "#c9c7c7"}} onClick={()=>handleQuantity("-")}>-</Box>
                    <Typography color="#3b3b3b">{quantity}</Typography>
                    <Box sx={{width: "35px",height: "35px",display: "flex",justifyContent: "center",alignItems: "center",fontSize: "20px",cursor: "pointer",borderRadius: "50%",backgroundColor: "#c9c7c7"}} onClick={()=>handleQuantity("+")}>+</Box>                 
                </Stack>
                <Box sx={{cursor: "pointer",backgroundColor: "#fff",width: "70%",height: "50px",display: "flex",justifyContent: "center",alignItems: "center",textTransform: "uppercase",border: "2px solid #187070"}} onClick={() => handleCart(currentProduct)}>Add to Cart</Box>
            </Stack>
            <Button variant="contained" sx={{bgcolor: "#187070",marginTop: "20px"}}>Buy now</Button>


        </Stack>

    </Stack>
  )
}

export default ViewProducts
