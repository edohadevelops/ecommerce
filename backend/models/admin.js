const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    position: {type: String, required: true},
    password: {type: String, required: true},
})

adminSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id,role: "superAdmin"},process.env.JWT_SECRET,{expiresIn: "1d"})
    return token;
}

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        username: Joi.string().required().label("Username"),
        position: Joi.string().required().label("Position"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

const SuperAdmin = mongoose.model("superadmin",adminSchema);

module.exports = {SuperAdmin,validate}
