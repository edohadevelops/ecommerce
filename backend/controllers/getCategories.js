const {Category} = require("../models/category");

module.exports = async(req,res) => {
    try{
        const categories = await Category.find();
        return res.status(200).send({message: "Categories found", categories})
    }catch(error){
        res.status(500).send({message: "Internal Server Error", error})
    }
}