const {Product} = require("../models/product");

module.exports = async(req,res) => {
    try{
        const products = await Product.find().populate('category');
        return res.status(200).send({data: products,message: "Products loaded successfully"})

    }catch(err){
        console.log(err)
        return res.status(500).send({message: "Internal Server Error",error: err})
    }
}