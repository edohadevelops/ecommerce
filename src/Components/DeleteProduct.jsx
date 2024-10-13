import React, {useState,useEffect,useContext} from 'react';
import { Box, Typography, Button, Grid, Stack} from '@mui/material';
import axios from 'axios';
import useGlobalState from '../GlobalStates/useGlobalState';


const DeleteProduct = ({id,setModalStatus}) => {
    const [image,setImage] = useState(null);

    const {products,setProducts} = useGlobalState();

    const [productData,setProductData] = useState({
        name: "",
        description: "",
        price: "",
        sizes: "",
        category: "",
        keywords: "",
        display: false,
        quantity: 0,
        colors: ""
    });

    useEffect(()=>{
        if(id){
            const currentProduct = products?.find((product) => product._id === id)
            setProductData(currentProduct)
        }
    },[])

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.delete(`http://localhost:5000/api/delete-product/${id}`)
            console.log(data.message);
            const updatedProducts = products.filter((product) => product._id !== id)
            setProducts(updatedProducts);
            setModalStatus({
                status: false
            })
        }catch(error){
            console.error(error)
        }
    }


  return (

    <Box sx={{paddingLeft: "30px",width: "400px", height: "150px",bgcolor: "#f1f1f1"}} marginY="40px" paddingY="20px" className="modal">
        <Typography variant="h5" marginBottom={"20px"}>Are you sure you wish to delete product: {productData.name}</Typography>

        <Stack direction="row" justifyContent="flex-end" gap="10px" paddingX="20px" marginTop="40px">

            <Button variant="contained" sx={{backgroundColor: "red",}} onClick={handleDelete}>
                Delete
            </Button>
            <Button variant="contained" sx={{backgroundColor: "white",color: "black"}} onClick={()=> setModalStatus({status: false})}>
                Cancel
            </Button>
            
        </Stack>
    </Box>
  )
}

export default DeleteProduct
