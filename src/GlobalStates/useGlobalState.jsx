import {useState, useContext} from 'react'
import { Context } from "../store/Store";

const useGlobalState = () => {
    const [products,setProducts,whoLoggedIn,setWhoLoggedIn,loginView,setLoginView,userID,setUserID,categories,setCategories,cart, setCart,cartModal,setCartModal,favouriteItems,setFavouriteItems] = useContext(Context);

    return {
        products,
        setProducts,
        whoLoggedIn,
        setWhoLoggedIn,
        loginView,
        setLoginView,
        userID,
        setUserID,
        categories,
        setCategories,
        cart,
        setCart,
        cartModal,
        setCartModal,
        favouriteItems,
        setFavouriteItems
    }
}

export default useGlobalState