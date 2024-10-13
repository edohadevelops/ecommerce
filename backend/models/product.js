const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    sizes: {type: Array, required: true},
    category: {type: Schema.Types.ObjectId,ref: "categorie", required: true},
    keywords: {type: Array, required: true},
    display: {type: Boolean, required: true},
    src: {type: String, required: true},
    quantity: {type: Number,required: true},
    colors: {type: Array,required: true}
});

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Product name"),
        description: Joi.string().required().label("Product description"),
        price: Joi.number().required().label("Price"),
        sizes: Joi.array().required().label("Sizes") ,
        category: Joi.string().regex(/^([0-9a-fA-F]{24})$/).required().label("Category"),
        keywords: Joi.array().required().label("Keywords"),
        display: Joi.boolean().required().label("Display product"),
        src: Joi.string().required().label("Product image"),
        quantity: Joi.number().required().label("Quantity"),
        colors: Joi.array().required().label("Colors")
    })
    return schema.validate(data)
}
const Product = mongoose.model("product",productSchema)

module.exports = {validate,Product}
