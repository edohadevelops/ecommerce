const {Cart} = require("../models/cart");
const {Product} = require("../models/product");

module.exports = async (req,res) => {
    try{
        const userId = req.params.userId;
        const itemId = req.body.itemId;

        const updatedCart = await Cart.findOneAndUpdate({user: userId,'items._id': itemId},{
            $set: {'items.$.quantity': req.body.quantity}
        },{new: true});
        
        if(!updatedCart)
            return res.status(400).send({message: "Failed to update cart"})
        return res.status(200).send({message: "Cart has been updated"})
    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal server error"})
    }
}