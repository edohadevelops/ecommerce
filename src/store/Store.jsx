import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const initialProducts = [];
const initialAdminCheck = false;
const initialLoginView = "login"

export const Context = createContext();

const Store = ({children}) => {
    const [products,setProducts] = useState(initialProducts)
    const [whoLoggedIn,setWhoLoggedIn] = useState(initialAdminCheck)
    const [loginView, setLoginView] = useState(initialLoginView)
    const [userID,setUserID] = useState("")
    const [categories,setCategories] = useState([]);
    const [cart, setCart] = useState({});
    const [cartModal,setCartModal] = useState(false);
    const [favouriteItems,setFavouriteItems] = useState([]);
    


    return (
        <Context.Provider value={[products,setProducts,whoLoggedIn,setWhoLoggedIn,loginView,setLoginView,userID,setUserID,categories,setCategories,cart, setCart,cartModal,setCartModal,favouriteItems,setFavouriteItems]}>
            {children}
        </Context.Provider>
    )
}

export default Store;