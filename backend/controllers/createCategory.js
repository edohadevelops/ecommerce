const {Category,validate} = require("../models/category");

module.exports = async(req,res) => {
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        const existingCategory = await Category.findOne({name: req.body.name});
        if(existingCategory){
            console.log(existingCategory)
            return res.status(400).send({message: "This Category already exists"});
        }
        const newCategory = await new Category({...req.body}).save();
        return res.status(200).send({message: "Category created successfully",newCategory})
    }catch(error){
        return res.status(500).send({message: "Internal Server Error",error})
    }
}