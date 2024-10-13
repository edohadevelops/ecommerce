const {Category,validate} = require("../models/category");

module.exports = async(req,res) => {
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        const id = req.params.categoryID;
        const updatedCategory = await Category.findByIdAndUpdate(id,req.body,{new: true});
        if(!updatedCategory)
            return res.status(400).send({message: "Category does not exist"})
        return res.status(200).send({message: "Category updated successfully",updatedCategory})
    }catch(error){
        return res.status(500).send({message: "Internal Server Error"})
    }

}