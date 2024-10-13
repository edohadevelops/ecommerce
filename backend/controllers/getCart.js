const {Cart} = require("../models/cart");

module.exports = async(req,res) => {
    try{
        const userId = req.params.userId
        const userCart = await Cart.findOne({user: userId}).populate('items.product');
        if(!userCart)
            return res.status(200).send({cart: {user: userId,items: [],totalPrice: 0,status: false}});
        return res.status(200).send({cart: userCart});
    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal Server Error"})
    }
}