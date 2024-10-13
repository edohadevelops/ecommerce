const {Cart} = require("../models/cart");
const {Product} = require("../models/product");

module.exports = async (req,res) => {
    try{
        const userId = req.params.userId;
        let existingCart = await Cart.findOne({user: userId});
        const product = await Product.findById(req.body.newItem.product)
        // const newTotalPrice = product.price * req.body.newItem.quantity;
        if(!existingCart){
            const newCart = await new Cart({
                user: userId,
                items: [req.body.newItem]
                // totalPrice: newTotalPrice,
                // status: false
            }).save();
            return res.status(200).send({message: "Cart created for user",cart: newCart})
        }else{
            // const items = existingCart.items;
            // const updatedItems = [...items,req.body.newItem];
            // const promises = updatedItems.map(async (currentItem)=>{
            //     const eachProduct = await Product.findById(currentItem.product);
            //     const costPerItem = eachProduct.price * currentItem.quantity;

            //     return costPerItem;
            // })
            // const updatedTotal = (await Promise.all(promises)).reduce((accummulator,costPerItem)=> accummulator + costPerItem,0);
            existingCart = await Cart.updateOne({user: userId},{$push: {items: req.body.newItem}})
            return res.status(200).send({message: "Added to cart successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({message: "Internal Server Error"})
    }

}