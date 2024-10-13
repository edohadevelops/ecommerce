import React, {useEffect,useState} from 'react';
import {Grid, Typography, Box, Button,Stack,Pagination} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProductCard from './ProductCard';

const Products = ({products,setModalStatus}) => {
    const perPage = 8;
    const [currentPage,setCurrentPage] = useState(1)
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentProducts = products.slice(firstIndex,lastIndex);
    

    const paginate = (e,value) => {
        setCurrentPage(value)
    }
  return (

    <>
        {currentProducts?.map((product)=>(
            <ProductCard product={product} setModalStatus={setModalStatus} />
        ))}
        <Grid item xs={12} sx={{marginY: "50px", justifyContent: "center",display: "block"}}>
            <Stack direction="row" justifyContent="center">
                {products.length > perPage && 
                    <Pagination 
                        color="standard"
                        shape="rounded"
                        defaultPage={1}
                        page={currentPage}
                        count={Math.ceil(products.length/perPage)}
                        onChange={paginate}
                        size='large'
                        sx={{margin: "auto"}}
                    />
                }
            </Stack>
        </Grid>
        
    </>
  )
}

export default Products
