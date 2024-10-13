import React, {useState,useEffect,useContext} from 'react';
import { Box, Typography, Button, Grid, Stack} from '@mui/material';
import axios from 'axios';
import { Context } from '../store/Store';
import useGlobalState from '../GlobalStates/useGlobalState';


const CreateCategory = ({type,id,setModalStatus}) => {
    const {categories,setCategories} = useGlobalState();

    const [category,setCategory] = useState("");
    useEffect(()=>{
        if(type === "updateCategory"){
            const currentCategory =  categories.find((category) => category._id === id)
            setCategory(currentCategory.name)
        }
    },[])

    const handleSave = async (e) => {
        e.preventDefault();
        try{
            const newCategories = [...categories];
            if(type === "newCategory" ){
                const {data: created} = await axios.post(`http://localhost:5000/api/create-category`,{name: category})
                newCategories.unshift(created.newCategory);
                setCategories(newCategories);
                console.log(created.message);

            }else if(type === "updateCategory"){
                const {data: updated} = await axios.put(`http://localhost:5000/api/update-category/${id}`,{name: category});
                const updatedIndex = newCategories.findIndex(category => category._id === id)
                newCategories[updatedIndex] = updated.updatedCategory;
                setCategories(newCategories);
                console.log(updated.message);
            }
            
            setCategory("")
            setModalStatus({
                status: false
            })
        }catch(error){
            console.error(error)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.delete(`http://localhost:5000/api/delete-category/${id}`)
            console.log(data.message);
            const updatedCategories = categories.filter((category) => category._id !== id)
            setCategories(updatedCategories);
            setModalStatus({
                status: false
            })
        }catch(error){
            console.error(error)
        }
    }


  return (

    <Box sx={{paddingX: "20px",width: "400px", height: type === "deleteCategory" ? "180px" : "220px",bgcolor: "#f1f1f1",borderRadius: "10px"}} marginY="40px" paddingY="20px" className="modal">
        <Typography variant="h6" marginBottom="20px">
            {
                type === "deleteCategory" ?
                "Are you sure you wish to delete this category":
                "Add new Category"
            }
        </Typography>
        
        {   
            (type === "newCategory" || type === "updateCategory" ) &&
            <Stack paddingX="10px">
                <label className='product-label'>Category name: </label>
                <input 
                    type='text' 
                    name="name" 
                    className="category-input" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </Stack>
        }
        <Stack direction="row" justifyContent="flex-end" gap="10px" marginTop="20px">
            {
                type === "deleteCategory" ?
                <Button variant="contained" sx={{backgroundColor: "red",}} onClick={handleDelete}>
                    Delete
                </Button>:
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            }
            <Button variant="contained" sx={{backgroundColor: "white",color: "black"}} onClick={()=> setModalStatus({status: false})}>
                Cancel
            </Button>
            
        </Stack>
    </Box>
  )
}

export default CreateCategory;
