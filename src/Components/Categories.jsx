import React, {useEffect,useState} from 'react';
import {Grid, Typography, Box, Button,Stack,Pagination} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from './Modal';
import useGlobalState from '../GlobalStates/useGlobalState';

const Categories = () => {
    const {categories} = useGlobalState();

    const perPage = 6;
    const [currentPage,setCurrentPage] = useState(1)
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentCategories = categories?.slice(firstIndex,lastIndex);

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
            <Typography variant="h5"  padding="10px">Categories</Typography>
            <Button 
            variant="contained"
            onClick={()=>handleModal("newCategory")}    
            >
                Add Category
            </Button>
        </Stack>
        <Grid container sx={{columnGap: "20px",rowGap: "40px",paddingX: {xs: "20px",sm: "40px", md: "50px"}}} justifyContent= "center">
        {currentCategories?.map((category)=>(
            <Grid item key={category._id} bgcolor="#bbd6d1" paddingBottom="20px" className="product-card" sx={{ width: {xs: "100%",sm: "50%",md: "30%"},borderBottomRightRadius: "30px",cursor: "pointer"}}>
                <Stack sx={{height: "200px"}} alignItems="center" justifyContent="center">
                    <Typography sx={{fontStyle: "italic"}} variant="h4">{category.name}</Typography>
                </Stack>
                <Box paddingX="20px">
                    <Stack direction="row" sx={{justifyContent: "space-between"}} mt="15px">
                        <Button sx={{color: "unset",backgroundColor: "#eceeee"}} onClick={() => handleModal("updateCategory",category._id)}><EditIcon /></Button>
                        <Button sx={{color: "unset",backgroundColor: "#eceeee"}} onClick={() => handleModal("deleteCategory",category._id)}><DeleteIcon /></Button>
                        <Button sx={{color: "unset",backgroundColor: "#eceeee"}}><RemoveRedEyeIcon /></Button>
                    </Stack>
                </Box>

            </Grid>
            ))}
            <Grid item xs={12} sx={{marginY: "50px", justifyContent: "center",display: "block"}}>
                <Stack direction="row" justifyContent="center">
                    {categories.length > perPage && 
                        <Pagination 
                            color="standard"
                            shape="rounded"
                            defaultPage={1}
                            page={currentPage}
                            count={Math.ceil(categories.length/perPage)}
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
export default Categories;

