const {Cart} = require("../../models/cart");
const {Product} = require("../../models/product")

const recordOrder = async (userId) => {
    try{
        const usersCart = await Cart.findOne({user: userId});

        usersCart.items.map(async(item)=>{
            const productToUpdate = await Product.findByIdAndUpdate(item.product,{quantity: quantity -= item.quantity})
        })

        const updatedCart = Cart.updateOne({user: userId},{$set: {items: []}});

        

        return {success: "Cart updated successfully"}
    }catch(error){
        console.log("Error occured while tryig to record the sale: ")
        return {error: error}
    }





}