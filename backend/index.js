require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/login/users")
const authRoutes = require("./routes/login/auth");
const createSuperAdmins = require("./routes/login/createSuperAdmin");
const getAdminData = require("./routes/login/getAdmin");
const getUserData = require("./routes/login/getUser");
const createProduct = require("./routes/product/newProduct");
const updateProduct = require("./routes/product/updateProduct");
const signUpload = require("./routes/product/signUpload");
const getProducts = require("./routes/product/get");
const deleteProduct = require("./routes/product/delete");
const newCategory = require("./routes/categories/create");
const error = require("./middlewares/error");
const getCategories = require("./routes/categories/get");
const updateCategory =  require("./routes/categories/update");
const deleteCategory = require("./routes/categories/delete");
const addToCart = require("./routes/cart/add");
const getCart = require("./routes/cart/get");
const updateCart = require("./routes/cart/update");
const deleteFromCart = require("./routes/cart/delete");
const updateFavourites = require("./routes/favourites/update");
const getFavourites = require("./routes/favourites/get");
const deleteFavourite = require("./routes/favourites/delete");
const makePayments = require("./routes/payment/initialize")
const verifyPayments = require("./routes/payment/verify")

//middlewares
app.use(express.json())
app.use(cors())
//middleware routes
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/createSupAdmin",createSuperAdmins);
app.use("/api/getAdminData",getAdminData);
app.use("/api/getUserData",getUserData);
app.use("/api/sign-productImage",signUpload)
app.use("/api/upload-product",createProduct)
app.use("/api/getProducts",getProducts);
app.use("/api/update-product",updateProduct);
app.use("/api/delete-product",deleteProduct);
app.use("/api/create-category",newCategory);
app.use("/api/get-categories",getCategories);
app.use("/api/update-category",updateCategory);
app.use("/api/delete-category",deleteCategory);
app.use("/api/add-cartItem",addToCart);
app.use("/api/get-cart",getCart);
app.use("/api/update-cart",updateCart);
app.use("/api/delete-cartItem",deleteFromCart);
app.use("/api/get-favourites",getFavourites);
app.use("/api/update-favourites",updateFavourites);
app.use("/api/delete-favourite", deleteFavourite);
app.use("/api/pay/initialize",makePayments);
app.use("/api/pay/verify",verifyPayments)





//error middleware

app.use(error)

app.listen(5000,() => {
    connection();
    console.log("listening for requests")
})