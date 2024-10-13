const {Category} = require("../models/category");

module.exports = async (req,res) => {
    try{
        const categoryId = req.params.categoryID;
        const deleted = await Category.findByIdAndDelete(categoryId);
        console.log(deleted)
        if(!deleted)
            return res.status(400).send({message: "Error deleting category"})
        return res.status(200).send({message: "Category deleted successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).send({message: "Internal Server Error",error})
    }

}