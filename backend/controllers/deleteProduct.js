const {Product} = require("../models/product");

module.exports = async(req,res) => {
    try{
        const productID = req.params.productID;
        await Product.findByIdAndDelete(productID);
        return res.status(200).send({message: "Products deleted successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).send({message: "Internal Server Error",error: err})
    }
}