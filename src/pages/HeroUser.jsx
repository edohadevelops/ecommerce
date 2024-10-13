import React,{useState,useEffect} from 'react'
import {Box, Typography,Grid,Stack,Button} from '@mui/material';
import Products from '../Components/Products';
import SearchIcon from '@mui/icons-material/Search';
import useGlobalState from '../GlobalStates/useGlobalState';
import UserModal from '../Components/Modals/userModals';
import CartModal from '../Components/Modals/CartModal';

const HeroUser = () => {

  const {products,categories,cartModal} = useGlobalState();
  
  const [filteredProducts,setFilteredProducts] = useState([]);

  const [modalStatus,setModalStatus] = useState({
    status: false,
  });

  const [searchQuery,setSearchQuery] = useState("")


  useEffect(()=>{
    setFilteredProducts([...products])
    console.log(products)
  },[products])

  const [active, setActive] = useState("All");
  const filterProductsByCategory = (category) => {
    if(active !== category && category !== "All"){
      setActive(category);
      setFilteredProducts(products.filter((product) => product.category.name.toLowerCase() === category.toLowerCase()))
    }else{
      setActive("All")
      setFilteredProducts([...products])
    }
  };

  const filterProductsBySearch = (searchQuery) => {
    setActive("All");
    const queries = searchQuery.split(" ");
    const searchedProducts = products.filter(product => 
      {
        return queries.every(query => (
          product.name.toLowerCase().includes(query) ||
          product.category.name.toLowerCase().includes(query) ||
          product.colors.find(color => color.toLowerCase().includes(query)) ||
          product.keywords.find(keyword => keyword.toLowerCase().includes(query)) ||
          product.sizes.find(size => size.toLowerCase().includes(query)) 
        ))
      }
    )
    setFilteredProducts(searchedProducts)
  }
  

  return (
    <Box sx={{}} marginTop="60px" paddingTop="50px" bgcolor="#eceeee" paddingX="30px">
      <Typography variant="h5" align="center" mb="30px" color="#187070">Products ({products.length})</Typography>
      <Stack direction="row" justifyContent="space-between" sx={{paddingX: "10px",marginBottom: "30px"}}>
        <Stack sx={{width: "600px",gap: "10px",display: "flex",flexDirection: "row",flexWrap: "wrap",alignItems: "center"}}>
            <Button variant="contained" sx={{height: "50px", paddingY: "10px",borderRadius: "30px",bgcolor: active === "All" ? "#187070" : "white",color: active === "All" ? "white" : "#187070"}} onClick={()=> filterProductsByCategory("All")}>
                  All
            </Button>
          {
            categories.map((category) => (
              <Button variant="contained" sx={{height: "50px", paddingY: "10px",borderRadius: "30px",bgcolor: active === category.name ? "#187070" : "white",color: active === category.name ? "white" : "#187070"}} onClick={()=> filterProductsByCategory(category.name)}>
                  {category.name}
              </Button>
            ))
          }
        </Stack>
        <Stack sx={{position: "relative",height: "45px", width: "300px",marginY: "20px"}}>
          <input type="text" placeholder="Search to filter" onChange={(e)=>{
            setSearchQuery(e.target.value)
            filterProductsBySearch(searchQuery.toLowerCase())
          }} value={searchQuery}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "20px",
            paddingLeft: "40px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            }} />
          <span style={{position: "absolute",top: 0,left: "10px",height: "45px",width: "30px",display: "flex",alignItems: "center",justifyContent: "center"}}>
            <SearchIcon fontSize="small" sx={{color: "green"}} />
          </span>
        </Stack>
      </Stack>
      <Grid container sx={{columnGap: "20px",rowGap: "40px"}} justifyContent= "center">
        <Products products={filteredProducts} setModalStatus={setModalStatus} />
      </Grid>
      {modalStatus?.status && <UserModal type={modalStatus.type} modalStatus={modalStatus} setModalStatus={setModalStatus}/>}
      {cartModal && <CartModal type={cartModal} />}
    </Box>
  )
}

export default HeroUser
