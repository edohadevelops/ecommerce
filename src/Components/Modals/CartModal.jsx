import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Stack,Typography,Button,Box,Grid} from '@mui/material';
import useGlobalState from '../../GlobalStates/useGlobalState';
import Divider from '@mui/material/Divider';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import CartItem from '../CartItem';
import FavouriteItem from '../FavouriteItem';
import formatter from '../../utils/currencyFormatter';
import { useNavigate } from 'react-router-dom';




const CartModal = ({type}) => {
    const {setCartModal,cart,favouriteItems} = useGlobalState();
    const [openCart,setOpenCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            setOpenCart(true)
        },100);
        console.log("favouriteIems is:",favouriteItems)
    },[])
    useEffect(()=>{
        const total = cart.items.reduce((accumulator,currentItem)=>{
            const costPerItem = currentItem.product.price * currentItem.quantity;
            
            return accumulator + costPerItem
        },0);
        setTotalPrice(total)
    },[])

  const handleModal = (e) => {
    if(e.target === e.currentTarget){
      setCartModal("")
    }
  }
  const handleCheckout = () => {
    navigate("/shop/checkout")
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
        justifyContent: "end",
        alignItems: "center",
        zIndex: 10000,
        overflowY: "auto",
        overflowX: "hidden"
     }}>
        <Stack sx={{width: "55%",height: "100%",position: "relative"}}>
            {
                type === "shop" ? 
                <Stack sx={{position: "absolute",height: "100%",top: "0",right: "0",transform: openCart ? "translateX(0)" : "translateX(100%)",transition: "1s",width: "60%",bgcolor: "white",padding: "20px"}}>
                    <Typography sx={{marginBottom: "10px",letterSpacing: "2px",color: "#187070"}}>CART({cart?.items.length})</Typography>
                    <Divider />
                    <Stack className="scroll-me" sx={{height: "350px",overflowY: "auto",marginTop: "20px", paddingRight: "20px"}}>
                        {
                            cart?.items.map((item) => (
                                <CartItem item={item} setTotalPrice={setTotalPrice} />
                            ))
                        }

                    </Stack>
                    <Stack direction="row" sx={{
                        marginTop: "20px",
                        borderTop: "1px solid gray",
                        borderBottom: "1px solid gray",
                        }}>
                        <Stack direction="row" sx={{
                            width: "50%",
                            height: "100%",
                            paddingY: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            color: "#3b3b3b",
                            cursor: "pointer"
                        }}>
                            <EditNoteIcon fontSize='small' />
                            <Typography sx={{fontSize: "12px",letterSpacing: "3px", textTransform: "uppercase"}}>Note</Typography>
                        </Stack>
                            <Divider flexItem orientation="vertical" variant="middle" sx={{bgcolor: "#3b3b3b"}} />
                        <Stack direction="row" sx={{
                            width: "50%",
                            height: "100%",
                            justifyContent: "center",
                            paddingY: "10px",
                            alignItems: "center",
                            gap: 1,
                            color: "#3b3b3b",
                            cursor: "pointer"
                        }}>
                            <LocalShippingIcon fontSize='small' />
                            <Typography sx={{fontSize: "12px",letterSpacing: "3px", textTransform: "uppercase"}}>Shipping</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{marginTop: "20px"}}>
                        <Typography textTransform="uppercase" sx={{color: "#187070", textTransform: "uppercase", letterSpacing: "1px"}}>SubTotal</Typography>
                        <Typography sx={{color: "brown",fontSize: "17px"}}>{formatter.format(totalPrice)} NGN</Typography>
                    </Stack>
                    <Typography sx={{
                        color: "gray",
                        fontSize: "14px",
                        marginBottom: "15px"
                    }}>Tax included. Shipping calculated at checkout</Typography>
                    <Stack direction="row">
                        <Link to="/shop/checkout" style={{
                            backgroundColor:"#187070",
                            cursor: "pointer",
                            width: "50%",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            letterSpacing: "3px",
                            fontSize: "15px",
                            color: "white",
                            textDecoration: "none"
                        }}>
                            CHECK OUT
                        </Link>
                        <Box variant="contained" sx={{
                            color: "black",
                            bgcolor:"#fff",
                            cursor: "pointer",
                            width: "50%",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #3b3b3b",
                            letterSpacing: "3px",
                            fontSize: "15px"
                        }}>
                            VIEW CART
                        </Box>
                    </Stack>
                </Stack> : 
                type === "favourite" ?
                <Stack sx={{position: "absolute",height: "100%",top: "0",right: "0",transform: openCart ? "translateX(0)" : "translateX(100%)",transition: "1s",width: "60%",bgcolor: "white",padding: "20px"}}>
                    <Typography variant="h5" sx={{marginBottom: "10px"}}>Favourites</Typography>
                    <Stack sx={{position: "relative",marginBottom: "20px"}}>
                        <input placeholder='Search to filter' style={{width: "100%",height: "40px",border: "0",borderBottom: "1px solid gray" }}/>
                        <span style={{position: "absolute",top: 0,right: "0",height: "45px",width: "30px",display: "flex",alignItems: "center",justifyContent: "center"}}>
                            <SearchIcon fontSize="small" sx={{color: "green"}} />
                        </span>
                    </Stack>
                    <Stack className="scroll-me" sx={{height: "550px",overflowY: "scroll",gap: "10px"}}>
                        {
                            favouriteItems?.map((item) => (
                                <FavouriteItem item={item} />
                            ))
                        }
                    </Stack>
                </Stack> : 
                ""
            }
        </Stack>
    </Stack>
  )
}

export default CartModal
