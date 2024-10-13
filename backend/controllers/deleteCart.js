const {Cart} = require("../models/cart");
const mongoose = require("mongoose");

module.exports = async (req,res) => {
    try{
        const userId = req.params.userId;
        console.log("THe user id is: ",userId);
        const usersCart = await Cart.findOne({user: userId});
        if(!usersCart)
            return res.status(400).send({message: "This user has no cart"});
        const prevItems = usersCart.items;
        const newItems = prevItems.filter(item => item._id.toString() !== req.body.itemId);
        console.log("request body is: ",req.body)
        console.log("items id is: ",prevItems.map(item => item._id.toString()))
        console.log("particular: ", req.body.itemId )


        const updatedCart = await Cart.updateOne({user: userId},{$set: {items: newItems}})
        return res.status(200).send({message: "Cart item has been deleted successfully"})

    }catch(error){
        console.log(error)
        return res.status(500).send({message: "Internal server error"})
    }
}