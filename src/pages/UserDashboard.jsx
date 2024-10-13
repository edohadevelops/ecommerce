import React, {useEffect,useContext, useState} from 'react'
import Navbar from '../Components/Navbar';
import HeroUser from './HeroUser';
import useGlobalState from '../GlobalStates/useGlobalState';
import axios from 'axios'

const UserDashboard = () => {
  const DB_URL = 'http://localhost:5000'
  const {setProducts,setCategories,userID,setCart,setFavouriteItems} = useGlobalState()
  useEffect(()=>{
    const getProducts = async() => {
      try{
        const {data: products} = await axios.get(`${DB_URL}/api/getProducts`);
        const {data: categories} = await axios.get(`http://localhost:5000/api/get-categories`);
        const {data: userCart} = await axios.get(`http://localhost:5000/api/get-cart/${userID}`);
        const {data: favCart} = await axios.get(`http://localhost:5000/api/get-favourites/${userID}`);
        setProducts(products.data);
        setCategories(categories.categories);
        setCart(userCart.cart);
        setFavouriteItems(favCart.items);
        console.log("Cart items is:",userCart.cart)
      }catch(error){
        console.log(error)
      }
        }
        getProducts()
    },[])
  // const [userData, setUserData] = useState({})

  return (
    <div>
      <Navbar type="user" />
      <HeroUser />
    </div>
  )
}

export default UserDashboard
