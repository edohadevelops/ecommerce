const mongoose = require("mongoose");
const Joi = require("joi");


const Schema = new mongoose.Schema({
    name: {type: String, required: true}
})

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Category Name")
    })
    return schema.validate(data)
}

const Category = mongoose.model("categorie",Schema);

module.exports = {Category,validate}