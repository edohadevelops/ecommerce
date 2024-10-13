import React, {useEffect,useState} from 'react';
import {Grid, Typography, Box, Button,Stack,Pagination} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import useGlobalState from '../GlobalStates/useGlobalState';

const ProductCard = ({product,setModalStatus}) => {
    const {userID,favouriteItems,setFavouriteItems} = useGlobalState();
    const [favActive,setFavActive] = useState(false);
    useEffect(()=>{
        const isFavourite = favouriteItems.some(item => item.name === product.name)
        if(isFavourite){
            setFavActive(true)
        }
        console.log()
    },[])

    const handleModal = (type,id) => {
        setModalStatus({
          status: true,
          type,
          id,
        })
    }
    const updateFavorites = async() => {
        try{
            if(!favActive){
                setFavActive(true);
                const newItems = [...favouriteItems,product];
                setFavouriteItems(newItems);
                const {data: addItem} = await axios.put(`http://localhost:5000/api/update-favourites/${userID}`,{item: product});
                console.log(addItem);
            }else{
                setFavActive(false);
                console.log("Fav items afer delete is:",favouriteItems)
                const updatedItems = favouriteItems.filter(item => item.name !== product.name);
                setFavouriteItems(updatedItems)
                const {data: removeItem} = await axios.put(`http://localhost:5000/api/delete-favourite/${userID}`,{name: product.name});
                console.log(removeItem);
            }
        }catch(error){
            console.log(error)
        }
    }

  return (
    <Grid item key={product.id} bgcolor="#fff" paddingBottom="20px" className="product-card" sx={{position: "relative", width: {xs: "100%",sm: "50%",md: "23%"}}}>
        <Box sx={{position: "relative",height: "200px"}}>
            <img src={product.src} alt={product.name} className='product-img'/>
        </Box>
        
        <Box paddingX="20px">
            <Box sx={{height: "90px",position: "relative"}}>
                <Typography mt="10px" fontSize="16px" variant="h1" sx={{height: "35px",maxWidth: "70%"}} >{product.name}</Typography>
                <Typography mt="10px" color="gray">{product.colors.length} Colors</Typography>
                <Typography fontSize="16px" variant="h1">&#8358; {product.price}</Typography>
                {
                    favActive ?
                    <FavoriteIcon onClick={()=>updateFavorites()} sx={{color: "#187070",position: "absolute",top: "0%",right:"-2%",cursor: "pointer"}} /> :
                    <FavoriteBorderIcon onClick={()=>updateFavorites()} sx={{color: "#187070",position: "absolute",top: "0%",right:"-2%",cursor: "pointer"}} />
                }
            </Box>
            
            {/* <Stack direction="row" sx={{justifyContent: "space-between"}} mt="15px">
            </Stack> */}
            <Button variant="contained" sx={{width: "100%", backgroundColor: "#187070", marginTop: "20px"}} onClick={()=>handleModal("viewProduct",product._id)}>View Product <RemoveRedEyeIcon fontSize="small" sx={{marginLeft: "5px"}}/></Button>
        </Box>
    </Grid>
  )
}

export default ProductCard
