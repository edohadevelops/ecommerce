import React, {useState,useEffect} from 'react';
import { Box, Typography, Button, Grid, Stack} from '@mui/material';
import axios from 'axios';
import useGlobalState from '../GlobalStates/useGlobalState';


const CreateProducts = ({type,id,setModalStatus}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const [image,setImage] = useState(null);

    const {products,setProducts,categories} = useGlobalState();

    const [productData,setProductData] = useState({
        name: "",
        description: "",
        price: "",
        sizes: "",
        category: categories[0].name,
        keywords: "",
        display: false,
        quantity: 0,
        colors: ""
    });

    useEffect(()=>{
        if(type === "update" && id){
            const currentProduct = products?.find((product) => product._id === id)
            setProductData({
                ...currentProduct,
                sizes: currentProduct.sizes.join(" ,"),
                keywords: currentProduct.keywords.join(" ,"),
                colors: currentProduct.colors.join(" ,"),
                category: currentProduct.category.name
            })
            setSelectedImage(currentProduct.src)
        }
    },[])

    const handleSelect = (e) => {
        const file = e.target.files[0];
        setImage(file)
        if(file){
            const reader = new FileReader;
            reader.onload = (e) => {
                setSelectedImage(e.target.result)
            }
            reader.readAsDataURL(file);
        }
    }
    const handleChange = ({currentTarget: input}) => {
        setProductData({...productData,[input.name]: input.value})

    }
    const uploadFile = async (timestamp,signature) => {
        const data = new FormData();
        data.append("file",image);
        data.append("timestamp",timestamp);
        data.append("signature",signature);
        data.append("api_key","313234348461939");
        data.append("folder","Ecommerce")

        try{
            const cloudName = "dvpwdppy2";
            const resourceType = "image"
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api,data);
            const {secure_url} = res.data;
            console.log("Image uploaded successfully at: ",secure_url);
            console.log(res.data)
            return secure_url;

        }catch(error){
            console.log(error)
        }
    }
    const getSignatureForUpload = async(folder) => {
        try{
            const url = `http://localhost:5000/api/sign-productImage`;
            const res = await axios.post(url,{folder});
            console.log(res.data)
            return res.data;
        }catch(error){
            console.error(error)
        }

    }
    const handleCheckbox = (e) => {
        setProductData({...productData,display: e.target.checked})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = productData;
        const newProducts = [...products];
        const res = await getSignatureForUpload("Ecommerce");
        let imgURL = data.src;
        const categoryId = categories.find((category) => category.name === data.category)._id;
        if(type === "create" || image){
            imgURL = await uploadFile(res?.timestamp,res?.signature);
            data.src = imgURL;
        }
        const newData = {
            ...data,
            price: Number(data.price),
            sizes: data.sizes.split(",").map(word => word.trim()),
            keywords: data.keywords.split(",").map(word => word.trim()),
            colors: data.colors.split(",").map(word => word.trim()),
            category: categoryId
            // src: imgURL,
        }
        try{
            if(type === "create"){
                const {data: product} = await axios.post(`http://localhost:5000/api/upload-product`,newData)
                newProducts.unshift(product.data);
                setProducts(newProducts)
                console.log(product.message)
            }else if(type === "update"){
                const {_id,__v,...updatedProducts} = newData;
                const {data: product} = await axios.post(`http://localhost:5000/api/update-product`,{updatedProducts,id: id})
                const newProductIndex = products.findIndex(product => product._id === id);
                newProducts[newProductIndex] = newData;
                setProducts(newProducts);
                console.log(product.message)
            }
            
            setModalStatus({
                status: false
            })
        }catch(error){
            console.error(error)
        }
    }


  return (

    <Box sx={{paddingLeft: "30px",width: "700px", height: "800px",bgcolor: "#f1f1f1"}} marginY="40px" paddingY="20px" className="modal">
        <Typography variant="h5" marginBottom={"20px"}>{type === "create" ? "Add new product" : "Update product"}</Typography>

        <form onSubmit={handleSubmit}>
            <Grid container sx={{columnGap: "50px",rowGap: "20px"}}>
                <Grid item xs={9}>
                    <label  className='product-label'>Product Image</label>
                    <Stack direction="row" sx={{alignItems: "flex-end"}}>
                        <img src={selectedImage ? selectedImage : "./assets/bolalogo.jpg"} alt="New product" style={{height: "150px",width:"200px",marginRight: "20px"}} className="new-product-image" />
                        <input type="file" sx={{width: "fit-content"}} accept="image/*"   onChange={handleSelect} />
                    </Stack>
                    
                </Grid>
                <Grid item xs={12} md={5}>
                    <label className='product-label'>Product name: </label>
                    <input 
                     type='text' 
                     name="name" 
                     className="product-input" 
                     value={productData.name}
                     onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <label className='product-label'>Product price: </label>
                    <input 
                     type='number' 
                     className="product-input" 
                     name="price" 
                     value={productData.price}  
                     onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <label className='product-label'>Stock: </label>
                    <input 
                     type='number' 
                     className="product-input" 
                     name="quantity" 
                     value={productData.quantity}  
                     onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <label className='product-label'>Sizes: <span className='label-description'>*Seperare different sizes with commas(,)</span></label>
                    <input className="product-input"
                     name="sizes"
                     onChange={handleChange}
                     value={productData.sizes}
                    ></input>
                </Grid>
                <Grid item xs={12} md={5}>
                    <label className='product-label'>Tags <span className='label-description'>*Seperare different tags with commas(,)</span></label>
                    <input className="product-input" name="keywords" value={productData.keywords}  onChange={handleChange}></input>
                </Grid>
                <Grid item xs={12} md={5}>
                    <label className='product-label'>Colors<span className='label-description'>*Seperare different tags with commas(,)</span></label>
                    <input className="product-input" name="colors" value={productData.colors}  onChange={handleChange}></input>
                </Grid>
                <Grid item xs={12} sx={{display: "flex",gap: "20px"}}>
                    <Stack direction="row" gap="5px">
                        <label className='product-label' style={{margin: "0"}}>Category: </label>
                        <select  onChange={handleChange} name="category" value={productData.category}>
                            {
                                categories?.map((category) => (
                                    <option key={category._id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </Stack>
                    <Stack direction="row" gap="5px">
                    <label className='product-label' style={{margin: "0"}}>Display product:</label>
                    <input type="checkbox" name="display" checked={productData.display} onChange={handleCheckbox} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={11} marginBottom="20px">
                    <label className='product-label'>Description: </label>
                    <textarea 
                     className="product-input description" 
                     name="description" 
                     value={productData.description}
                     onChange={handleChange}>
                    </textarea>
                </Grid>
            </Grid>
            <Button variant="contained" type="submit">
                Save
            </Button>
            
        </form>
    </Box>
  )
}

export default CreateProducts
