import React, {useEffect,useState} from 'react';
import {Grid, Typography, Box, Button,Stack,Pagination} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from './Modal';

const AdminProducts = ({products,productType}) => {
    const perPage = 6;
    const [currentPage,setCurrentPage] = useState(1)
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentProducts = products?.slice(firstIndex,lastIndex);

    const [modalStatus,setModalStatus] = useState({
        status: false,
        type: "",
        id: "",
    });

    const handleModal = (type,id) => {
        setModalStatus({
            status: "true",
            type,
            id
        })
    }


    const paginate = (e,value) => {
        setCurrentPage(value)
    }
  return (

    <Box bgcolor="#eceeee">
        <Stack direction="row" justifyContent="space-between" padding="20px 30px 30px">
            <Typography variant="h5"  padding="10px">Products</Typography>
            <Button 
            variant="contained"
            onClick={()=>handleModal("create")}    
            >
                Create new product
            </Button>
        </Stack>
        <Grid container sx={{columnGap: "20px",rowGap: "40px",paddingX: {xs: "20px",sm: "40px", md: "50px"}}} justifyContent= "center">
        {currentProducts.map((product)=>(
            <Grid item key={product._id} bgcolor="#bbd6d1" paddingBottom="20px" className="product-card" sx={{ width: {xs: "100%",sm: "50%",md: "30%"}}}>
                <Box sx={{height: "200px"}}>
                    <img src={product.src} alt={product.name} className='product-img'/>
                </Box>
                <Box paddingX="20px">
                    <Box sx={{height: "90px"}}>
                        <Typography mt="10px" fontSize="18px" fontWeight="600" >{product.name}</Typography>
                        <Typography mt="10px"><span style={{fontWeight: "600"}}>Price(NGN): </span>{product.price}</Typography>
                    </Box>
                    
                    <Stack direction="row" sx={{justifyContent: "space-between"}} mt="15px">
                        <Button sx={{color: "unset",backgroundColor: "#eceeee"}} onClick={()=>handleModal("update",product._id)}><EditIcon /></Button>
                        <Button sx={{color: "unset",backgroundColor: "#eceeee"}} onClick={()=>handleModal("delete",product._id)}><DeleteIcon /></Button>
                        <Button sx={{color: "unset",backgroundColor: "#eceeee"}}><RemoveRedEyeIcon /></Button>

                    </Stack>
                </Box>

                </Grid>
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
        </Grid>
        {modalStatus?.status && <Modal type={modalStatus.type} modalStatus={modalStatus} setModalStatus={setModalStatus}/>}

        
    </Box>
  )
}

export default AdminProducts
