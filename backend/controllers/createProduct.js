const { Product, validate } = require("../models/product")

module.exports = async (req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        const existingProduct = await Product.findOne({name: req.body.name});
        if(existingProduct)
            return res.status(400).send({message: "Product with this name already exists"})
        const newProduct = await new Product({...req.body}).save();
        return res.status(200).send({message: "Product successfully created",data: newProduct})
    }catch(error){
        res.status(500).send({message: "Internal Server Error",error});
    }
}

