const { Product, validate } = require("../models/product")

module.exports = async (req,res)=>{
    try{
        const {error} = validate(req.body.updatedProducts);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        const productData = req.body.updatedProducts;
        console.log(req.body.id)
        const updatedProduct = await Product.findByIdAndUpdate(req.body.id,productData,{new: true})
        if(!updatedProduct){
            console.log("product not found")
            return res.status(400).send({message: "Product not found"})
        }
        return res.status(200).send({message: `Successfully updated: ${updatedProduct.price}`})
    }catch(error){
        console.log(error)
        res.status(500).send({message: "Internal Server Error",error});
    }
}

