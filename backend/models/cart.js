const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        color: String,
        size: String,
    }]
});
const Cart = mongoose.model("cart",cartSchema);

module.exports = {Cart}